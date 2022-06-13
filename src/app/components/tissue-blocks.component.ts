import { Component, Input } from '@angular/core'
import { VisualizationSpec } from 'vega-embed'
import { GraphAttribute, MAIN_CONFIG_JSON, OrderType, PreviewMode } from '../models/parameters.model'

@Component({
  selector: 'tissue-blocks',
  templateUrl: './tissue-blocks.component.html',
  styleUrls: ['./tissue-blocks.component.css']
})

export class TissueBlocksComponent {
  spec: VisualizationSpec
  @Input() configSource: string
  @Input() datasetSource: string
  @Input() sortBy: String
  @Input() orderType: OrderType
  @Input() groupBy: GraphAttribute
  @Input() yAxisField: GraphAttribute
  @Input() xAxisField: GraphAttribute
  @Input() showUi: Boolean
  @Input() previewMode: PreviewMode

  constructor() {
    // Set defaults
    this.configSource = MAIN_CONFIG_JSON
    this.datasetSource = null
    this.yAxisField = GraphAttribute.Count
    this.xAxisField = GraphAttribute.DatasetName
    this.orderType = OrderType.Descending
    this.groupBy = GraphAttribute.None
    this.showUi = false
  }

  respecBarGraph(spec: VisualizationSpec) {
    this.spec = spec
  }
}
