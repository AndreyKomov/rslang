import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import AboutUsComponent from './pages/about-us/about-us.component';
import HoverPersonInfoDirective from './pages/about-us/hover-person-info.directive';
import CardPersonComponent from './pages/about-us/card-person/card-person.component';

@NgModule({
  declarations: [AppComponent, AboutUsComponent, HoverPersonInfoDirective, CardPersonComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AudioCallModule],
  providers: [AudioCallService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
