import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import AppComponent from '@app/app.component';
import WordsApiService from './server/api';
import ServerTestingComponent from './server-testing/server-testing.component';

import AppRoutingModule from './app-routing.module';
import SharedModule from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ServerTestingComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [WordsApiService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
