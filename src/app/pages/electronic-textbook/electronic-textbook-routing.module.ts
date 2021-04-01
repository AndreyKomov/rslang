import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import CategoryComponent from './category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';

const routes: Routes = [
  {
    path: 'textbook',
    component: ElectronicTextbookComponent,
    children: [{ path: 'group/:id', component: CategoryComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ElectronicTextbookRoutingModule {
  components = [ElectronicTextbookComponent, CategoryComponent];
}
