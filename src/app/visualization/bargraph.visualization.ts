import { VisualizationSpec } from "vega-embed";
import { GraphAttribute, OrderType } from "../models/parameters.model";

export interface StackedBarsSpecOptions {
  graphTitle: string
  values: Array<Record<string, any>>
  xAxisField: GraphAttribute
  yAxisField: GraphAttribute
  sortBy: string
  orderType: OrderType
  groupBy: GraphAttribute
  legendField: GraphAttribute
  legendDomain: string[]
  legendRange: string[]
  fixedBars?: number,
  barWidth?: number,
  graphHeight?: number,
  tooltip?: boolean,
  groupSpacing?: number,
  labelAngle?: number,
  legendSymbolLimit?: number,
  legendSymbolPerColumn?: number,
  graphTitleFontSize?: number
}

export function getStackedBarsSpec(userOptions: StackedBarsSpecOptions) : VisualizationSpec {
  const options = Object.assign({
    fixedBars: 0,
    barWidth: 50,
    graphHeight: 650,
    tooltip: true,
    groupSpacing: 10,
    labelAngle: -25,
    legendSymbolLimit: 100,
    legendSymbolPerColumn: 30,
    graphTitleFontSize: 18,
  }, userOptions)
  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      values: options.values
    },
    width: {
      step: options.barWidth
    },
    height: options.graphHeight,
    mark: {
      type: 'bar',
      tooltip: true
    },
    encoding: {
      facet: options.groupBy === GraphAttribute.None ? undefined : {
        field: options.groupBy,
        type: 'ordinal',
        spacing: options.groupSpacing,
        sort: {
          field: GraphAttribute.Order,
          op: 'sum',
          order: options.orderType
        }
      },
      x: {
        field: options.xAxisField,
        title: getAttributeTitle(options.xAxisField),
        sort: {
          field: GraphAttribute.Order,
          op: 'sum',
          order: options.orderType
        },
        type: 'nominal',
        axis: {
          labelAngle: options.labelAngle
        },
      },
      y: {
        field: options.yAxisField,
        title: getAttributeTitle(options.yAxisField),
        aggregate: 'sum',
        scale: {
          domain: getScaleDomain(options.yAxisField)
        }
      },
      color: {
        field: options.legendField,
        title: getAttributeTitle(options.legendField),
        type: 'nominal',
        scale: {
          domain: options.legendDomain,
          range: options.legendRange
        },
        legend: {
          symbolLimit: options.legendSymbolLimit,
          columns: Math.ceil(options.legendDomain.length / options.legendSymbolPerColumn)
        }
      }
    },
    title: {
      text: options.graphTitle,
      anchor: 'middle',
      fontSize: options.graphTitleFontSize
    },
    transform: [
      {
        calculate: `datum.index < ${options.fixedBars} ? 
          ${options.orderType === OrderType.Ascending ? 0 : Number.MAX_SAFE_INTEGER } - datum.index : 
          datum.cell_type == '${options.sortBy}' ? 
          datum.${options.yAxisField} : 0`,
        as: GraphAttribute.Order
      }
    ],
    resolve: {
      scale: {
        x: 'independent'
      }
    }
  }
  return spec;
}

function getAttributeTitle(attribute: GraphAttribute) : string {
  switch (attribute) {
  case GraphAttribute.Dataset: return 'Dataset'
  case GraphAttribute.CellType: return 'Cell Type'
  case GraphAttribute.Count: return 'Cell Count'
  case GraphAttribute.Percentage: return 'Cell Proportion'
  default: return ''
  }
}

function getScaleDomain(attribute: GraphAttribute) : Array<number> | undefined {
  switch (attribute) {
  case GraphAttribute.Percentage: return [0, 100]
  default: return undefined
  }
}