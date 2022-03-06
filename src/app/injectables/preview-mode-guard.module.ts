
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { isOfTypePreviewMode, PreviewMode } from '../models/parameters.model';

@Injectable()
export class PreviewModeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const mode = route.paramMap.get('mode') as PreviewMode
    if (isOfTypePreviewMode(mode)) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
