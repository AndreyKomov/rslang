import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudiocallPromoComponent } from './components/audiocall-promo/audiocall-promo/audiocall-promo.component';
import { AudiocallGameComponent } from './components/game/audiocall-game.component';
import { AudiocallRoutingModule } from './audiocall-routing.module';

@NgModule({
  declarations: [AudiocallPromoComponent, AudiocallGameComponent],
  imports: [CommonModule, AudiocallRoutingModule],
})
export class AudiocallModule {}
