import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import ElectronicTextbookComponent from './pages/electronic-textbook/electronic-textbook.component';

const routes: Routes = [
  {
    path: 'textbook',
    component: ElectronicTextbookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
