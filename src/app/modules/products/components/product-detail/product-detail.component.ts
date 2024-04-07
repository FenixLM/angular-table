import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { ProductInterface } from '../../interfaces/products.interface';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { AlertaInterface } from 'src/app/shared/interfaces/alerta.interface';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../services/product.service';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: ProductInterface = {};

  constructor(
    private matDialog: MatDialog,
    public matDialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private productService: ProductService,
    private dialogService: DialogService
  ) {
    console.log(this.data);

    if (data && data.product) {
      this.product = this.data.product;
    }
  }

  openDialogEdit(product: ProductInterface) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { title: 'EDITAR PRODUCTO', product },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      result && this.dialogService.dialogClosed.emit({ refresh: true });
    });
  }

  openDialogDelete(product: ProductInterface) {
    const dataAlerta: AlertaInterface = {
      iconFont: 'delete',
      titulo: 'Eliminar Producto',
      mensaje: `¿Está seguro de eliminar el producto ${product.nombre}?`,
    };
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '600px',
      data: dataAlerta,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.aceptar) {
        this.productService.deleteProduct(product._id!).subscribe({
          next: resp => {
            console.log(resp);
            this.closeDialog();
            this.aviso(
              'done',
              'Producto eliminado',
              'El producto ha sido eliminado'
            );
            this.dialogService.dialogClosed.emit({ refresh: true });
          },
          error: err => {
            console.error(err);
          },
        });
      }
    });
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
