import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AudiocallPromoComponent } from './components/audiocall-promo/audiocall-promo/audiocall-promo.component';
import { AudiocallGameComponent } from './components/game/audiocall-game.component';

const routes: Routes = [
  { path: '', component: AudiocallPromoComponent },
  { path: 'audiocallgame', component: AudiocallGameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudiocallRoutingModule {}
