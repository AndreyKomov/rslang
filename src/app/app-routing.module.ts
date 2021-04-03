import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoComponent } from './pages/promo/promo.component';
import { ParamKey, QueryParamKey } from './app-routing.enum';

const routes: Routes = [
  { path: ParamKey.promo, component: PromoComponent, pathMatch: 'full' },
  { path: ParamKey.promo, component: PromoComponent },
  {
    path: `${ParamKey.games}/${ParamKey.audiocallPromo}`,
    loadChildren: (): any =>
      import('./pages/games/audiocall-game/audiocall.module').then(
        (module) => module.AudiocallModule
      ),
  },
  {
    path: ParamKey.games,
    loadChildren: (): any =>
      import('./pages/games/games.module').then((module) => module.GamesModule),
  },
  {
    path: ParamKey.team,
    loadChildren: (): any => import('./pages/team/team.module').then((module) => module.TeamModule),
  },
  { path: ParamKey.notFound, redirectTo: QueryParamKey.redirectTo },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
