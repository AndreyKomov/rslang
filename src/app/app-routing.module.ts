import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: 'promo',
    loadChildren: () => import('./pages/promo/promo.module').then((module) => module.PromoModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
