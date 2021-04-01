import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';

import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import ElectronicTextbookModule from './pages/electronic-textbook/electronic-textbook.module';
import AppRoutingModule from './app-routing.module';
import ElectronicTextbookService from './pages/electronic-textbook/electronic-textbook.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AudioCallModule,
    ElectronicTextbookModule,
    AppRoutingModule,
  ],
  providers: [AudioCallService, ElectronicTextbookService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
