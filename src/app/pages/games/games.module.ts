import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GamesRoutingModule } from './games-routing.module';
import { SprintGameComponent } from './sprint-game/sprint-game.component';

@NgModule({
  declarations: [GamesComponent, SprintGameComponent],
  imports: [CommonModule, GamesRoutingModule],
})
export class GamesModule {}
