import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/products.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductInterface> {
    const products = this.http.get(`${environment.apiUrl}/products`);
    return products;
  }

  saveProduct(product: ProductInterface) {
    console.log('Product created', product);
    return this.http.post(`${environment.apiUrl}/products`, product);
  }
}
