import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TissueBlocksComponent } from './components/tissue-blocks.component';
import { ConfigSelectorsComponent } from './components/config-selectors.component';
import { BarGraphComponent } from './components/bar-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    TissueBlocksComponent,
    ConfigSelectorsComponent,
    BarGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
