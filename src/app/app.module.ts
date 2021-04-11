import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import AppComponent from '@app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import WordsApiServiceComponent from './server/api';
import AppRoutingModule from './app-routing.module';
import SharedModule from './shared/shared.module';

import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';
import ElectronicTextbookService from './pages/electronic-textbook/electronic-textbook.service';

import RegistrationComponent from './pages/registration/registration/registration.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    WordsApiServiceComponent,
    ElectronicTextbookService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export default class AppModule {}
