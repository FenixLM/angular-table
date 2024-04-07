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

  saveProduct(productFormData: any, productId?: string) {
    const etiquetas = productFormData.get('etiquetas');
    console.log(etiquetas);

    if (productId) {
      // Si hay un ID de producto, es una actualización
      return this.http.put(
        `${environment.apiUrl}/products/${productId}`,
        productFormData
      );
    } else {
      // Si no hay un ID de producto, es una creación
      return this.http.post(`${environment.apiUrl}/products`, productFormData);
    }
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${environment.apiUrl}/products/${productId}`);
  }
}
