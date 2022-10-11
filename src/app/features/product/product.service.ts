import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${environment.bff}/v1/products`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.bff}/v1/products/${id}`);
  }
}
