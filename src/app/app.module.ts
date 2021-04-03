import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import AppComponent from '@app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ServerTestingComponent from './server-testing/server-testing.component';
import WordsApiService from './server/api';
import RegistrationComponent from './pages/registration/registration/registration.component';
import AppRoutingModule from './app-routing.module';
import SharedModule from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, RegistrationComponent, ServerTestingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [WordsApiService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
