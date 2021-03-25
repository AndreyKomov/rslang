import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import { HeaderComponent } from './pages/header/header.component';
import { HeaderMenuComponent } from './pages/header/header-menu/header-menu.component';
import { HeaderAuthComponent } from './pages/header/header-auth/header-auth.component';
import { HeaderUserMenuComponent } from './pages/header/header-user-menu/header-user-menu.component';
import { HeaderLogoComponent } from './pages/header/header-logo/header-logo.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HeaderMenuComponent, HeaderAuthComponent, HeaderUserMenuComponent, HeaderLogoComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AudioCallModule],
  providers: [AudioCallService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
