import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent } from './pages/team/team.component';
import { PromoComponent } from './pages/promo/promo.component';
import { GamesComponent } from './pages/games/games.component';
import { VocabularyComponent } from './pages/vocabulary/vocabulary.component';
import { SavannaComponent } from './pages/savanna/savanna.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const appRoutes: Routes = [
    { path: 'promo', component: PromoComponent },
    { path: 'games', component: GamesComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export default class AppRoutingModule { }
