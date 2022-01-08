import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TissueBlocksService } from './services/tissue-blocks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tissue-blocks'

  public constructor(private titleService: Title, private tissueBlockService: TissueBlocksService) {
    this.titleService.setTitle('CNS Tissue Blocks')
    this.tissueBlockService.injectElement()
  }
}
