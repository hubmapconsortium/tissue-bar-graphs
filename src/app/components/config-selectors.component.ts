import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { Configuration, GraphAttribute, OrderType, Presets, PreviewMode, PreviewPresets, Source } from '../models/parameters.model'
import { VisualizationSpec } from 'vega-embed';
import { parse } from 'papaparse';
import urljoin from 'url-join';
import { getStackedBarsSpec, StackedBarsSpecOptions } from './../visualization/bargraph.visualization';

@Component({
  selector: 'config-selectors',
  templateUrl: './config-selectors.component.html'
})

export class ConfigSelectorsComponent implements OnChanges {
  generalSortLabels: string[]
  cellTypes: string[]
  graphData: Array<Record<string, any>>
  presets: Record<Source, Configuration>
  config: Configuration
  loading: Boolean
  OrderType = OrderType
  groupOptions?: Array<Record<string, any>>
  @Input() datasetSource: Source
  @Input() sortBy: string
  @Input() orderType: OrderType
  @Input() groupBy: GraphAttribute
  @Input() yAxisField: GraphAttribute
  @Input() previewMode: PreviewMode
  @Output() vegaSpecEvent: EventEmitter<VisualizationSpec>

  public constructor() {
    this.generalSortLabels = ['Total Cell Count']
    this.cellTypes = []
    this.graphData = []
    this.presets = Presets
    this.loading = false
    this.vegaSpecEvent = new EventEmitter<VisualizationSpec>()
  }

  async getCsv(url: string): Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
      parse(url, {
        download: true,
        delimiter: ',',
        header: true,
        skipEmptyLines: true,
        complete: (result: Record<string, any>) => {
          resolve(result.data)
        },
        error: () => {
          reject(`Failed to load from URL: ${url}`)
        }
      })
    })
  }

  async loadDataset(resetFields: Boolean = false) {
    this.config = Presets[this.datasetSource]
    this.graphData.splice(0, this.graphData.length)
    this.cellTypes.splice(0, this.cellTypes.length)
    if (resetFields || !this.sortBy) {
      this.sortBy = 'Total Cell Count'
    }
    if (resetFields || !this.groupBy) {
      this.groupBy = GraphAttribute.None
    }
    const uniqueCTs = new Set<string>()

    this.groupOptions = Object.entries(this.config.groupTypes)
      .reduce((types, [name, value]) => {
        types.push({ name, value })
        return types
      }, [{
        name: 'None',
        value: GraphAttribute.None
      }])

    // Make requests in parallel
    try {
      const promises = this.config.datasets.map(title => this.getCsv(urljoin(this.config.basePath, `&sheet=${encodeURIComponent(title)}`)))
      const datasets = await Promise.all(promises)

      // Create master list of all datasets
      for (const [index, csvData] of datasets.entries()) {
        csvData.forEach(row => {
          row['dataset'] = this.config.datasets[index]
          row['index'] = index
          uniqueCTs.add(row['cell_type'])
          this.graphData.push(row)
        })
      }
    } catch (error) {
      console.error(error)
    }

    this.generalSortLabels = ['Total Cell Count', ...this.config.sortAttributes]
    this.cellTypes = Array.from(uniqueCTs).sort()

    // Create a Vega spec and embed component
    this.emitSpec()
  }

  /**
   * Function to generate Vega spec
   */
  async emitSpec() {
    const options: StackedBarsSpecOptions = {
      graphTitle: 'Cell Population Comparison',
      values: this.graphData,
      xAxisField: GraphAttribute.Dataset,
      yAxisField: this.yAxisField,
      sortBy: this.sortBy,
      orderType: this.orderType,
      groupBy: this.groupBy,
      legendField: GraphAttribute.CellType,
      legendDomain: this.cellTypes,
      legendRange: Array.from(this.config.colorPalette).reverse().slice(0, this.cellTypes.length),
      fixedBars: this.config.fixed
    }
    if (this.previewMode) {
      Object.assign(options, {
        legendOrient: 'bottom',
        legendSymbolPerColumn: 12
      })
    }
    const spec = getStackedBarsSpec(options)
    this.vegaSpecEvent.emit(spec)
    this.loading = false
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.previewMode) {
      // Initial change from constructor that should be ignored
      if (changes.previewMode.isFirstChange()) return;
      // Load dataset after preview mode check is complete
      // To prevent double loading
      if (changes.previewMode.currentValue === 'azimuth-kidney') {
        this.presets = PreviewPresets
        this.datasetSource = Source.Kidney
        this.yAxisField = GraphAttribute.Percentage
        this.groupBy = GraphAttribute.Sex
      }
      this.loadDataset()
    }
  }
}
