import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import AppComponent from '@app/app.component';
import AppRoutingModule from './app-routing.module';
import SharedModule from './shared/shared.module';
import { ConstructorGameComponent } from './pages/constructor-game/constructor-game/constructor-game.component';

@NgModule({
  declarations: [AppComponent, ConstructorGameComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
