import { Component } from '@angular/core'
import { VisualizationSpec } from 'vega-embed'

@Component({
  selector: 'tissue-blocks',
  templateUrl: './tissue-blocks.component.html'
})

export class TissueBlocksComponent {
  spec: VisualizationSpec
  
  respecBarGraph(spec: VisualizationSpec) {
    this.spec = spec
  }
}
