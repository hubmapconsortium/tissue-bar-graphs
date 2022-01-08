import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TissueBlocksModule } from './modules/tissue-blocks.module';
import { TissueBlocksService } from './services/tissue-blocks.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [TissueBlocksModule],
  providers: [TissueBlocksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
