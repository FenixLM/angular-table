import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/products.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  saveProduct(product: ProductInterface) {
    console.log('Product created', product);
    return this.http.post('http://localhost:3000/products', product);

  }
}
