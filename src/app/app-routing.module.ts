import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoComponent } from './pages/promo/promo.component';
import { ParamKey, QueryParamKey } from './app-routing.enum';

const routes: Routes = [
  { path: ParamKey.promo, component: PromoComponent, pathMatch: 'full' },
  { path: ParamKey.promo, component: PromoComponent },
  {
    path: ParamKey.games,
    loadChildren: () => import('./pages/games/games.module').then((module) => module.GamesModule),
  },
  {
    path: ParamKey.team,
    loadChildren: () => import('./pages/team/team.module').then((module) => module.TeamModule),
  },
  { path: ParamKey.notFound, redirectTo: QueryParamKey.redirectTo },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
