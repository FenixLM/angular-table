import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss'],
})
export class AvisoComponent {
  constructor(
    public matDialogRef: MatDialogRef<AvisoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(e: Event) {
    e.preventDefault();
    this.matDialogRef.close({ aceptar: false });
  }
}
