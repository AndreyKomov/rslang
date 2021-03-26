import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoComponent } from './promo.component';

import { PromoRoutingModule } from './promo-routing.module';

@NgModule({
  declarations: [PromoComponent],
  imports: [CommonModule, PromoRoutingModule],
})
export class PromoModule {}
