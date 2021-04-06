import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import SharedModule from '@app/shared/shared.module';
import CategoryComponent from './category/category.component';
import ElectronicTextbookComponent from './electronic-textbook.component';
import ElectronicTextbookRoutingModule from './electronic-textbook-routing.module';

import { CardWordComponent } from './card-word/card-word.component';
import { PageComponent } from './page/page.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ElectronicTextbookComponent,
    CardWordComponent,
    PageComponent,
    SettingsDialogComponent,
  ],
  imports: [CommonModule, SharedModule, ElectronicTextbookRoutingModule],
})
export class ElectronicTextbookModule {}
