import { Component } from '@angular/core';
import { Configuration, GraphAttribute, OrderType, Presets } from './models/parameters.model';
import embed, { Result, VisualizationSpec } from 'vega-embed';
import { parse } from 'papaparse';
import { Title } from '@angular/platform-browser';
import { getStackedBarsSpec, StackedBarsSpecOptions } from './visualization/bargraph.visualization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tissue-bar-graphs'
  yAxisField: GraphAttribute
  sortBy: string
  orderType: OrderType
  groupBy: GraphAttribute
  cellTypes: string[]
  graphData: Array<Record<string, any>>
  selectedConfig: number
  configOptions: Array<Configuration>
  config: Configuration
  result?: Result
  OrderType = OrderType
  groupOptions?: Array<Record<string, any>>

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Tissue Bar Graphs')
    this.yAxisField = GraphAttribute.Count
    this.orderType = OrderType.Ascending
    this.groupBy = GraphAttribute.None
    this.cellTypes = []
    this.graphData = []
    this.selectedConfig = 0
    this.configOptions = Presets
    this.config = Presets[0]
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
    // Reinitialize canvas and all parameters
    if (this.result) {
      this.result.finalize()
      this.result = undefined
    }
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
    this.specAndEmbed()
  }

  /**
   * Common function to respec Vega, for simplicity
   */
  async specAndEmbed() {
    const options: StackedBarsSpecOptions = {
      graphTitle: 'Cell Population Comparison',
      values: this.graphData,
      xAxisField: GraphAttribute.Dataset,
      yAxisField: this.yAxisField,
      sortBy: this.sortBy,
      orderType: this.orderType,
      groupBy: this.groupBy,
      legendField: GraphAttribute.CellType,
      legendDomain: this.cellTypes.slice(1),
      legendRange: Array.from(this.config.colorPalette).reverse().slice(0, this.cellTypes.length - 1),
      fixedBars: this.config.fixed
    }
    const spec = getStackedBarsSpec(options)
    this.result = await embed('#vis', spec)
  }
  
  ngOnInit() {
    this.loadDataset();
  }
}
