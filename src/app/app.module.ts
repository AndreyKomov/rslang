import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import AppComponent from '@app/app.component';

import MaterialModule from './pages/material/material.module';
import FooterComponent from './pages/footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  bootstrap: [AppComponent],
})
export default class AppModule {}
