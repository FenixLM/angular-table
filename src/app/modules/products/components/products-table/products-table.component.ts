import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductInterface } from '../../interfaces/products.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: ProductInterface[] = [];
  @Input() loading: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog
  ) {
  }

  displayedColumns: string[] = ['nombre', 'descripcion', 'sku', 'imagen', 'etiquetas', 'precio', 'stock', 'actions'];
  productsSource: MatTableDataSource<ProductInterface> = new MatTableDataSource<ProductInterface>();

  ngOnInit(): void {
    this.getProducts();

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
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { title: 'CREAR PRODUCTO' },
      disableClose: true
    });
  }

  openDialogDetail(product: ProductInterface) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '600px',
      data: { product },
      disableClose: true
    });
  }

  openDialogEdit(product: ProductInterface) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      data: { title: 'EDITAR PRODUCTO', product },
      disableClose: true
    });
  }

  openDialogDelete(product: ProductInterface) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '600px',
      data: { product },
      disableClose: true
    });
  }


}
