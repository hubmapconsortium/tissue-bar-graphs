import { Component, Output, EventEmitter, OnInit } from '@angular/core'
import { Configuration, GraphAttribute, OrderType, Presets } from '../models/parameters.model'
import { Result, VisualizationSpec } from 'vega-embed';
import { parse } from 'papaparse';
import { getStackedBarsSpec, StackedBarsSpecOptions } from './../visualization/bargraph.visualization';

@Component({
  selector: 'config-selectors',
  templateUrl: './config-selectors.component.html'
})

export class ConfigSelectorsComponent implements OnInit {
  yAxisField: GraphAttribute
  sortBy: string
  orderType: OrderType
  groupBy: GraphAttribute
  generalSortLabels: string[]
  cellTypes: string[]
  graphData: Array<Record<string, any>>
  selectedConfig: number
  configOptions: Array<Configuration>
  config: Configuration
  loading: Boolean
  OrderType = OrderType
  groupOptions?: Array<Record<string, any>>
  @Output() vegaSpecEvent: EventEmitter<VisualizationSpec>

  public constructor() {
    this.yAxisField = GraphAttribute.Count
    this.orderType = OrderType.Ascending
    this.groupBy = GraphAttribute.None
    this.generalSortLabels = ['Total Cell Count']
    this.cellTypes = []
    this.graphData = []
    this.selectedConfig = 0
    this.configOptions = Presets
    this.config = Presets[0]
    this.loading = false
    this.vegaSpecEvent = new EventEmitter<VisualizationSpec>()
  }

  async getCsv(url: string) : Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
      parse(url, {
        download: true,
        delimiter: ',',
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result: Record<string, any>) => {
          resolve(result.data)
        },
        error: reject
      })
    })
  }
  
  async loadDataset() {
    this.config = Presets[this.selectedConfig]
    this.graphData.splice(0, this.graphData.length)
    this.cellTypes.splice(0, this.cellTypes.length)
    this.sortBy = 'None'
    this.groupBy = GraphAttribute.None
    const uniqueCTs = new Set<string>()
    
    this.groupOptions = Object.entries(this.config.groupTypes)
      .reduce((types, [name, value]) => {
        types.push({ name, value })
        return types
      }, [{
        name: 'None',
        value: GraphAttribute.None
      }])

    // Create master list of all datasets
    for (const [index, title] of this.config.datasets.entries()) {
      const csvData = await this.getCsv(`${this.config.basePath}${title}.csv`)
      csvData.forEach(row => {
        row['dataset'] = title
        row['index'] = index
        uniqueCTs.add(row['cell_type'])
        this.graphData.push(row)
      })
    }

    this.cellTypes = ['None'].concat(Array.from(uniqueCTs).sort())

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
    const spec = getStackedBarsSpec(options)
    this.vegaSpecEvent.emit(spec)
    this.loading = false
  }
  
  ngOnInit() {
    this.loadDataset();
  }
}