import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PromoComponent } from '@app/pages/promo/promo.component';
import MaterialModule from './component/material/material.module';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderMenuComponent } from './layout/header/header-menu/header-menu.component';
import { HeaderLogoComponent } from './layout/header/header-logo/header-logo.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthButtonComponent } from './layout/auth-button/auth-button.component';
import { FooterSliderComponent } from './layout/footer/footer-slider/footer-slider.component';
import { FooterCredentialsComponent } from './layout/footer/footer-credentials/footer-credentials.component';
import { PromoButtonComponent } from './layout/promo-button/promo-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    AuthButtonComponent,
    FooterSliderComponent,
    FooterCredentialsComponent,
    PromoButtonComponent,
    PromoComponent,
  ],
  imports: [RouterModule, CommonModule, MaterialModule],
  exports: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    AuthButtonComponent,
    FooterSliderComponent,
    FooterCredentialsComponent,
    PromoButtonComponent,
    PromoComponent,
  ],
  providers: [],
})
export default class SharedModule {}
