import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoComponent } from './promo.component';
import { PromoButtonComponent } from './promo-button/promo-button.component';

@NgModule({
  declarations: [PromoComponent, PromoButtonComponent],
  imports: [CommonModule],
})
export class TeamModule {}
