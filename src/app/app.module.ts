import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TissueBlocksModule } from './modules/tissue-blocks.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { PreviewModeGuard } from './injectables/preview-mode-guard.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent
  ],
  imports: [AppRoutingModule, TissueBlocksModule],
  bootstrap: [AppComponent],
  providers: [PreviewModeGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
