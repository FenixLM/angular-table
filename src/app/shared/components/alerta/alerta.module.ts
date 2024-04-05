import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './alerta.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AlertaComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [AlertaComponent],
})
export class AlertaModule {}
