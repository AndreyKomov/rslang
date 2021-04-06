import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { GamesComponent } from './games.component';

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
