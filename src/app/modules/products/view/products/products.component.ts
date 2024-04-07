import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductInterface } from '../../interfaces/products.interface';
import { ProductService } from '../../services/product.service';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: ProductInterface[] = [];
  spinnerRef: any;
  constructor(
    private productsService: ProductService,
    private matDialog: MatDialog,
    private dialogService: DialogService
  ) {
    this.dialogService.dialogClosed.subscribe((data) => {
      if (data.refresh) {
        console.log('Evento recibido', data);
        this.spinner();
        this.getProducts();

        setTimeout(() => {
          this.matDialog.getDialogById('spinn')?.close();
        }, 2500);
      }
    });
  }

  ngOnInit(): void {
    this.spinner();
    this.getProducts();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.matDialog.getDialogById('spinn')?.close();
    }, 2500);
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (resp: any) => {
        this.products = resp;
        console.log(this.products);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // handleDeleteProductChange(productData: {
  //   deleted: boolean;
  //   product: ProductInterface;
  // }) {
  //   const { deleted, product } = productData;
  //   if (deleted && product && product._id) {
  //     console.log('Deleting product', product._id);

  //     this.productsService.deleteProduct(product._id).subscribe({
  //       next: (resp) => {
  //         console.log(resp);
  //         this.getProducts();
  //         this.aviso(
  //           'done',
  //           'Producto eliminado',
  //           'El producto ha sido eliminado'
  //         );
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       },
  //     });
  //   }
  // }

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

  spinner() {
    return this.matDialog.open(SpinnerComponent, {
      id: 'spinn',
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container-tp',
      disableClose: true,
    });
  }
}
