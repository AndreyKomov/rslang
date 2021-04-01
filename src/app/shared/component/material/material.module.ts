import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [MatButtonModule, MatCardModule, MatTooltipModule];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules],
})
export default class MaterialModule {}
