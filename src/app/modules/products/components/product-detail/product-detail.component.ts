import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { ProductInterface } from '../../interfaces/products.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: ProductInterface = {};

  constructor(
    private matDialog: MatDialog,
    public matDialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);

    if (data && data.product) {
      this.product = this.data.product;
    }
  }



  ngOnInit(): void {
  }

  closeDialog() {
    this.matDialogRef.close();
  }


  aviso(iconFont: string, titulo?: string, mensaje?: string) {
    return this.matDialog.open(AvisoComponent, {
      id: 'avisoDialog',
      width: '450px',
      height: 'auto',
      panelClass: '',
      data: {
        iconFont,
        titulo,
        mensaje,
      },
    });
  }

}
