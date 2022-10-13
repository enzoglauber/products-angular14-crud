import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  share,
  switchMap,
  timer,
} from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from './product';
import { ProductFilter } from './product-filter/product-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  CACHE_TIMEOUT = 2000;

  private _products = new BehaviorSubject<Product[]>([]);
  public products$ = this._products.asObservable().pipe(distinctUntilChanged());

  private _filter = new BehaviorSubject<ProductFilter>({ code: '', category: '' });
  public filter$ = this._filter.asObservable().pipe(distinctUntilChanged(), debounceTime(300));
  get filter(): ProductFilter {
    return this._filter.getValue()
  }

  constructor(private http: HttpClient) {}

  getAll = () => {
    const params = this.params(this.filter)
    return this.http.get<Product[]>(`${environment.bff}/v1/products`, {params}).pipe(
      map(this.nextProducts),
    );
  }

  save = (entity: Product): Observable<Product> => {
    console.log('entity', entity)
    if (entity.id) {
      return this.http.put<Product>(`${environment.bff}/v1/products`, entity).pipe(
        map((product) => {
          console.log('edit', product);
          return product;
        })
      );
    } else {
      return this.http.post<Product>(`${environment.bff}/v1/products`, entity).pipe(
        map((product) => {
          console.log('add', product);
          return product;
        })
      );
    }
  }

  check = (entity: Partial<Product>): Observable<void> => {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<void>(`${environment.bff}/v1/products/check`, entity, options).pipe(
      map((product) => {
        console.log('check', product);
        return product;
      })
    );
  }

  get all$(): Observable<any> {
    return this.filter$.pipe(
      switchMap(this.getAll)
    );
  }

  private nextProducts = (value: Product[]): Product[] => {
    this._products.next(value);
    return value;
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.bff}/v1/products/${id}`).pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(this.CACHE_TIMEOUT)
      })
    )
  }

  public setFilter = (value: ProductFilter): void => {
    this._filter.next(value);
  }

  public params = (req: Object) => {
    let parms = new HttpParams();
    return Object.entries(req).reduce((params, [key, value]) => {
      params = (!!value) ? params.append(key, value.toString()) : params;
      return params;
    }, parms);
  }
}
