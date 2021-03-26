import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { ParamKeys } from './app-routing.enum';

const routes: Routes = [
  { path: ParamKeys.main, component: MainComponent, pathMatch: 'full' },
  {
    path: ParamKeys.promo,
    loadChildren: () => import('./pages/promo/promo.module').then((module) => module.PromoModule),
  },
  { path: ParamKeys.redirect, redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
