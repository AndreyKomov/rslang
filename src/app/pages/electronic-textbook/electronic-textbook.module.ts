import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import CategoryComponent from './category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';
import ElectronicTextbookRoutingModule from './electronic-textbook-routing.module';

@NgModule({
  declarations: [CategoryComponent, ElectronicTextbookComponent],
  imports: [CommonModule, ElectronicTextbookRoutingModule],
})
export default class ElectronicTextbookModule {}
