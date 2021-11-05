import { Component, Input, SimpleChange } from "@angular/core"
import embed, { Result, VisualizationSpec } from "vega-embed"

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})

export class BarGraphComponent {
  result: Result
  @Input() spec: VisualizationSpec

  async ngOnChanges(change: SimpleChange) {
    if (this.result) {
      this.result.finalize()
    }
    this.result = await embed('#vega-tissue-bg', this.spec)
  }
}
