import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Configuration, getAttributeTitle, GraphAttribute, isOfTypePreviewMode, OrderType, PreviewMode, PREVIEW_CONFIG_JSON } from '../models/parameters.model'
import { VisualizationSpec } from 'vega-embed';
import { parse } from 'papaparse';
import urljoin from 'url-join';
import { getStackedBarsSpec, StackedBarsSpecOptions } from './../visualization/bargraph.visualization';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'config-selectors',
  templateUrl: './config-selectors.component.html'
})

export class ConfigSelectorsComponent implements OnChanges {
  generalSortLabels: string[]
  cellTypes: string[]
  graphData: Array<Record<string, any>>
  presets: Record<string, Configuration>
  config: Configuration
  loading: Boolean
  OrderType = OrderType
  groupOptions?: Array<Record<string, string>>
  @Input() configSource: string
  @Input() datasetSource: string
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
    this.presets = {}
    this.loading = false
    this.vegaSpecEvent = new EventEmitter<VisualizationSpec>()
  }

  onCompare(_left: KeyValue<string, Configuration>, _right: KeyValue<string, Configuration>): number {
    return _left.value.label.localeCompare(_right.value.label)
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
    if (!(this.datasetSource in this.presets)) {
      console.error('No config found for provided data source.')
      return
    }
    this.config = this.presets[this.datasetSource]
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
      .reduce((types, [key, label]) => {
        types.push({ key: key as GraphAttribute, label })
        return types
      }, [{
        key: GraphAttribute.None,
        label: 'None'
      }])

    // Make requests in parallel
    try {
      const promises = this.config.datasets.map(title => {
        const fileUrl = (() => {
          if (this.config.basePath.includes('docs.google.com')) {
            // Request Google Sheets API through query param
            return urljoin(this.config.basePath, `&sheet=${encodeURIComponent(title)}`)
          }
          // Append title as CSV to base path otherwise
          return urljoin(this.config.basePath, encodeURIComponent(`${title}.csv`))
        })();
        return this.getCsv(fileUrl)
      })
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

    this.generalSortLabels = ['Total Cell Count', ...this.config.sortAttributes.map(getAttributeTitle)]
    this.cellTypes = Array.from(uniqueCTs).sort()
    if (this.config.defaultYAxisField) {
      this.yAxisField = this.config.defaultYAxisField
    }
    if (this.config.defaultGroupBy) {
      this.groupBy = this.config.defaultGroupBy
    }

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

  async ngOnChanges(changes: SimpleChanges) {
    if (!!changes.previewMode) {
      // Initial change from constructor that should be ignored
      if (changes.previewMode.isFirstChange()) return;
      // Load dataset after preview mode check is complete
      // To prevent double loading
      if (isOfTypePreviewMode(this.previewMode)) {
        this.configSource = PREVIEW_CONFIG_JSON
      }
      try {
        const response = await fetch(this.configSource, {
          method: 'GET',
          cache: 'reload',
          redirect: 'follow'
        })
        this.presets = await response.json()
        // Set first key as default if no value was supplied to component
        if (!this.datasetSource) {
          this.datasetSource = Object.keys(this.presets)[0]
        }
      } catch {
        console.error('Unable to load JSON config.')
      }
      this.loadDataset()
    }
  }
}
