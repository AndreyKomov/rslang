import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './layout/header/header.component';
import { HeaderMenuComponent } from './layout/header-menu/header-menu.component';
import { HeaderLogoComponent } from './layout/header-logo/header-logo.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [RouterModule, BrowserModule],
  exports: [
    HeaderComponent,
    HeaderMenuComponent,
    HeaderLogoComponent,
    FooterComponent,
    MainComponent,
  ],
  providers: [],
})
export default class SharedModule {}
