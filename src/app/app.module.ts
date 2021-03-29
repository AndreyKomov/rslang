import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';
import GamePageComponent from './pages/game-page/game-page.component';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';

@NgModule({
  declarations: [AppComponent, GamePageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AudioCallModule],
  providers: [AudioCallService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
