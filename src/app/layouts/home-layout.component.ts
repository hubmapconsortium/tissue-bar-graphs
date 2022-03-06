import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewMode } from '../models/parameters.model';

@Component({
  templateUrl: './home-layout.component.html'
})
export class HomeLayoutComponent {
  previewMode: PreviewMode

  constructor(route: ActivatedRoute) {
    const mode: PreviewMode = route.snapshot.paramMap.get('mode') as PreviewMode ||
      // Fallback value for preview mode, currently only 1 mode supported
      // Remove line below when more than 1 preview mode is available
      route.snapshot.routeConfig.path?.startsWith('preview') ? 'azimuth-kidney' : null
    this.previewMode = mode
  }
}
