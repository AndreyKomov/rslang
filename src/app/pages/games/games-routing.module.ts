import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
