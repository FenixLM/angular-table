import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductInterface } from '../../interfaces/products.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: ProductInterface[] = [];
  @Input() loading: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor() {
  }

  displayedColumns: string[] = ['nombre', 'descripcion', 'sku', 'imagen', 'etiquetas', 'precio', 'stock', 'actions'];
  productsSource: MatTableDataSource<ProductInterface> = new MatTableDataSource<ProductInterface>();

  ngOnInit(): void {
    this.getProducts();

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


}
