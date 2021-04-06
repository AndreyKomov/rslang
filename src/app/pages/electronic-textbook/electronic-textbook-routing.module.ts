import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import CategoryComponent from './category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronicTextbookComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'group/0/page/0',
      },
      {
        path: 'group/:group',
        component: CategoryComponent,
      },
      { path: 'group/:group/page/:page', component: PageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ElectronicTextbookRoutingModule {
  components = [ElectronicTextbookComponent, CategoryComponent];
}
