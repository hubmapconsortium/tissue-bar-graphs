import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { TissueBlocksModule } from "./app/modules/tissue-blocks.module";

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(TissueBlocksModule)
  .catch(err => console.error(err));