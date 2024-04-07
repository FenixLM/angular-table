import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductInterface } from '../../interfaces/products.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { AlertaInterface } from 'src/app/shared/interfaces/alerta.interface';
import { ProductService } from '../../services/product.service';
import { AvisoComponent } from 'src/app/shared/components/aviso/aviso.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  @Input() products: ProductInterface[] = [];
  @Input() loading: boolean = false;

  // @Output() deleteProduct: EventEmitter<{
  //   deleted: boolean;
  //   product: ProductInterface;
  // }> = new EventEmitter<{ deleted: boolean; product: ProductInterface }>();

  // @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private matDialog: MatDialog,
    private productService: ProductService,
    private dialogService: DialogService
  ) {}

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'sku',
    'imagen',
    'etiquetas',
    'precio',
    'stock',
    'actions',
  ];
  productsSource: MatTableDataSource<ProductInterface> =
    new MatTableDataSource<ProductInterface>();

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue) {
      this.getProducts();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.productsSource = new MatTableDataSource(this.products);
      this.productsSource.paginator = this.paginator!;
      this.paginator!._intl.itemsPerPageLabel = 'Productos por página';
    }, 2000);
  }

  openDialogCreate() {
    const dialogRef = this.matDialog.open(ProductFormComponent, {
      width: '600px',
      data: { title: 'CREAR PRODUCTO' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      result && this.dialogService.dialogClosed.emit({ refresh: true });
    });
  }

  openDialogDetail(product: ProductInterface) {
    const dialogRef = this.matDialog.open(ProductDetailComponent, {
      width: '600px',
      data: { product },
      disableClose: true,
    });
  }

  openDialogEdit(product: ProductInterface) {
    const dialogRef = this.matDialog.open(ProductFormComponent, {
      width: '600px',
      data: { title: 'EDITAR PRODUCTO', product },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      result && this.dialogService.dialogClosed.emit({ refresh: true });
    });
  }
  openDialogDelete(product: ProductInterface) {
    const dataAlerta: AlertaInterface = {
      iconFont: 'delete',
      titulo: 'Eliminar Producto',
      mensaje: `¿Está seguro de eliminar el producto ${product.nombre}?`,
    };
    const dialogRef = this.matDialog.open(AlertaComponent, {
      width: '600px',
      data: dataAlerta,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.aceptar) {
        this.productService.deleteProduct(product._id!).subscribe({
          next: (resp) => {
            console.log(resp);
            this.aviso(
              'done',
              'Producto eliminado',
              'El producto ha sido eliminado'
            );
            this.dialogService.dialogClosed.emit({ refresh: true });
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
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
