import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SprintGameComponent } from './sprint-game.component';

@NgModule({
  declarations: [SprintGameComponent],
  imports: [FormsModule, CommonModule],
  exports: [SprintGameComponent],
})
export class SprintGameModule {}
