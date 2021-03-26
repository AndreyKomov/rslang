import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import AppComponent from '@app/app.component';
import AppRoutingModule from './app-routing.module';
import MaterialModule from './pages/material/material.module';
import SharedModule from './shared/shared.module';

import AudioCallService from './pages/audio-call/audio-call.service';
import AudioCallModule from './pages/audio-call/audio-call.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AudioCallModule,
  ],
  providers: [AudioCallService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
