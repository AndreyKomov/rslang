import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import WordsApiService from './server/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AudioCallModule],
  providers: [AudioCallService, WordsApiService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
