import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './view/products/products.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ProductsModule { }
