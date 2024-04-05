import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisoComponent } from './aviso.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AvisoComponent],
  imports: [CommonModule, MatIconModule],
  exports: [AvisoComponent],
})
export class AvisoModule {}
