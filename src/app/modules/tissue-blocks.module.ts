import { Injector, NgModule } from "@angular/core"
import { createCustomElement } from "@angular/elements"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { BarGraphComponent } from "../components/bar-graph.component"
import { TissueBlocksComponent } from "../components/tissue-blocks.component"
import { ConfigSelectorsComponent } from "../components/config-selectors.component"

@NgModule({
  declarations: [
    TissueBlocksComponent,
    ConfigSelectorsComponent,
    BarGraphComponent
  ],
  entryComponents: [TissueBlocksComponent],
  imports: [
    BrowserModule,
    FormsModule,
  ]
})
export class TissueBlocksModule {
  constructor(readonly injector: Injector) {
    const tissueBlocksEl = createCustomElement(TissueBlocksComponent, {
      injector,
    });

    customElements.define('cns-tissue-blocks', tissueBlocksEl);
  }

  ngDoBootstrap() {}
}
