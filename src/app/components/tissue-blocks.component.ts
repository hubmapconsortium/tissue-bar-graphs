import { Component, Input } from '@angular/core'
import { VisualizationSpec } from 'vega-embed'
import { GraphAttribute, OrderType, PreviewMode, Source } from '../models/parameters.model'

@Component({
  selector: 'tissue-blocks',
  templateUrl: './tissue-blocks.component.html',
  styleUrls: ['./tissue-blocks.component.css']
})

export class TissueBlocksComponent {
  spec: VisualizationSpec
  @Input() datasetSource: Source
  @Input() sortBy: String
  @Input() orderType: OrderType
  @Input() groupBy: GraphAttribute
  @Input() yAxisField: GraphAttribute
  @Input() showUi: Boolean
  @Input() previewMode: PreviewMode

  constructor() {
    // Set defaults
    this.datasetSource = Source.BlueLakeKidney
    this.yAxisField = GraphAttribute.Count
    this.orderType = OrderType.Descending
    this.groupBy = GraphAttribute.None
    this.showUi = false
  }

  respecBarGraph(spec: VisualizationSpec) {
    this.spec = spec
  }
}
