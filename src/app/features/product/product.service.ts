import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, ReplaySubject, share, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  CACHE_TIMEOUT = 2000;

  private _products = new BehaviorSubject<Product[]>([]);
  public products$ = this._products.asObservable().pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.bff}/v1/products`).pipe(
      map(this.nextProducts),
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(this.CACHE_TIMEOUT)
      })
    );
  }

  private nextProducts = (value: Product[]): Product[] => {
    this._products.next(value);
    return value;
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.bff}/v1/products/${id}`);
  }
}