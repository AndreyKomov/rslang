import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';
import { HttpClientModule } from '@angular/common/http';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import WordsApiService from './server/api';
import ServerTestingComponent from './server-testing/server-testing.component';

@NgModule({
  declarations: [AppComponent, ServerTestingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AudioCallModule,
    HttpClientModule,
  ],
  providers: [AudioCallService, WordsApiService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
