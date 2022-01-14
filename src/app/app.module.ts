import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TissueBlocksModule } from './modules/tissue-blocks.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [TissueBlocksModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
