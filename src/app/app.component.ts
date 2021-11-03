import { Component } from '@angular/core';
import { GroupType, OrderType, Configuration, Presets } from './models/parameters.model';
import embed, { Result, VisualizationSpec } from 'vega-embed';
import { parse } from 'papaparse';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tissue-bar-graphs';
  yAxisAttr = 'count';
  sortBy = 'None';
  orderType = OrderType.Ascending;
  cellTypes: string[] = [];
  graphData: Array<Record<string, any>> = [];
  groupBy = GroupType.None;
  selectedConfig: number = 0;
  configOptions:Array<Configuration> = Presets;
  config: Configuration = Presets[0]
  result?: Result;
  OrderType = OrderType
  groupOptions?: Array<Record<string, any>>

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Tissue Bar Graphs')
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
    this.groupBy = GroupType.None
    const uniqueCTs = new Set<string>()
    
    this.groupOptions = Object.entries(this.config.groupTypes)
      .reduce((types, [name, value]) => {
        types.push({ name, value })
        return types
      }, [{
        name: 'None',
        value: GroupType.None
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
    const spec: VisualizationSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      data: {
        values: this.graphData
      },
      width: {
        step: 50
      },
      height: 650,
      mark: {
        type: 'bar',
        tooltip: true
      },
      encoding: {
        facet: this.groupBy === GroupType.None ? undefined : {
          field: this.groupBy,
          type: 'ordinal',
          spacing: 10,
          sort: {
            field: 'order',
            op: 'sum',
            order: this.orderType
          }
        },
        x: {
          field: 'dataset',
          title: 'Dataset',
          sort: {
            field: 'order',
            op: 'sum',
            order: this.orderType
          },
          type: 'nominal',
          axis: {
            labelAngle: -25
          },
        },
        y: {
          field: this.yAxisAttr,
          aggregate: 'sum',
          title: this.yAxisAttr === 'count' ? 'Cell Count' : 'Cell Proportion',
          scale: {
            domain: this.yAxisAttr === 'percentage' ? [0, 100] : undefined
          }
        },
        color: {
          field: 'cell_type',
          type: 'nominal',
          scale: {
            domain: this.cellTypes.slice(1),
            range: Array.from(this.config.colorPalette).reverse().slice(0, this.cellTypes.length - 1)
          },
          title: 'Cell Type',
          legend: {
            symbolLimit: 100,
            columns: Math.ceil(this.cellTypes.length / 30)
          }
        }
      },
      title: {
        text: 'Cell Type Count Comparison',
        anchor: 'middle',
        fontSize: 18
      },
      transform: [
        {
          calculate: `datum.index < ${this.config.fixed} ? 
            ${this.orderType === OrderType.Ascending ? 0 : Number.MAX_SAFE_INTEGER } - datum.index : 
            datum.cell_type == '${this.sortBy}' ? 
            datum.${this.yAxisAttr} : 0`,
          as: 'order'
        }
      ],
      resolve: {
        scale: {
          x: 'independent'
        }
      }
    }
    this.result = await embed('#vis', spec)
  }
  
  ngOnInit() {
    this.loadDataset();
  }
}
