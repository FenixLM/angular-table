import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertaInterface } from '../../interfaces/alerta.interface';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent {
  constructor(
    public matDialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertaInterface
  ) {}

  aceptar() {
    this.matDialogRef.close({ aceptar: true });
  }
  onNoClick() {
    this.matDialogRef.close({ aceptar: false });
  }
}
