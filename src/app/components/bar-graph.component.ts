import { Component, Input, OnChanges, SimpleChanges } from "@angular/core"
import embed, { Result, VisualizationSpec } from "vega-embed"

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})

export class BarGraphComponent implements OnChanges {
  result: Result
  @Input() spec: VisualizationSpec

  async ngOnChanges(changes: SimpleChanges) {
    if (this.result) {
      this.result.finalize()
    }
    this.result = await embed('#vega-tissue-bg', this.spec)
  }
}
