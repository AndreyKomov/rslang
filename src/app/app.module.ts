import { TiamService } from './team/services/tiam.service';
import { PromoService } from './promo/services/promo.service';
import { OurGameService } from './our-game/services/our-game.service';
import { MaterialModule } from '@material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@app/app.component';

import { AppRoutingModule } from '@app/app-routing.module';
import { AudioCallService } from './audio-call/services/audio-call.service';
import { TeamModule } from './team/team.module';
import { OurGameModule } from './our-game/our-game.module';
import { PromoModule } from './promo/promo.module';
import { AudioCallModule } from './audio-call/audio-call.module';
import { MainModule } from './main/main.module';
import { SavannaModule } from './savanna/savanna.module';
import { SprintModule } from './sprint/sprint.module';
import { StatisticModule } from './statistic/statistic.module';
import { UserModule } from './user/user.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { SavannaService } from './savanna/services/savanna.service';
import { SprintService } from './sprint/services/sprint.service';
import { StatisticService } from './statistic/services/statistic.service';
import { UserService } from './user/services/user.service';
import { VocabularyService } from './vocabulary/services/vocabulary.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PromoModule,
    MainModule,
    OurGameModule,
    MaterialModule,
    SavannaModule,
    SprintModule,
    StatisticModule,
    TeamModule,
    UserModule,
    VocabularyModule,
    AudioCallModule,
    AppRoutingModule,
  ],
  providers: [
    AudioCallService,
    AudioCallService,
    OurGameService,
    PromoService,
    SavannaService,
    SprintService,
    StatisticService,
    TiamService,
    UserService,
    VocabularyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
