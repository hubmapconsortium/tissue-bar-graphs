import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewModeGuard } from './injectables/preview-mode-guard.module';
import { HomeLayoutComponent } from './layouts/home-layout.component';

const routes: Routes = [
  { path: '', component: HomeLayoutComponent },
  { path: 'preview', component: HomeLayoutComponent },
  { path: 'preview/:mode', component: HomeLayoutComponent, canActivate: [PreviewModeGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }