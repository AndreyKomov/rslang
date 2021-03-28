import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AudioCallService from './pages/audio-call/audio-call.service';

import MaterialModule from './pages/material/material.module';
import AudioCallModule from './pages/audio-call/audio-call.module';
import RegistrationComponent from './pages/registration/registration/registration.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AudioCallModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AudioCallService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
