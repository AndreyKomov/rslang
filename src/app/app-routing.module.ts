import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { ParamKey, QueryParamKey } from './app-routing.enum';

const routes: Routes = [
  { path: ParamKey.main, component: MainComponent, pathMatch: 'full' },
  {
    path: ParamKey.promo,
    loadChildren: () => import('./pages/promo/promo.module').then((module) => module.PromoModule),
  },
  {
    path: ParamKey.audiocallPromo,
    loadChildren: () => import('./pages/games/audiocall-game/audiocall.module').then((module) => module.AudiocallModule),
  },
  { path: ParamKey.notFound, redirectTo: QueryParamKey.redirectTo },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
