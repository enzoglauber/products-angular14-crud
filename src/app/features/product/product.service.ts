import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  get products(): Product[] {
    return this._products.getValue()
  }

  private _filter = new BehaviorSubject<ProductFilter>({ code: '', category: '' });
  public filter$ = this._filter.asObservable().pipe(distinctUntilChanged(), debounceTime(300));
  get filter(): ProductFilter {
    return this._filter.getValue()
  }

  constructor(
    private http: HttpClient,
    protected router: Router,
  ) {}

  getAll = () => {
    const params = this.params(this.filter)
    return this.http.get<Product[]>(`${environment.bff}/v1/products`, {params}).pipe(
      map(this.nextProducts)
    );
  }

  getOne = (id: number) => {
    return this.http.get<Product>(`${environment.bff}/v1/products/${id}`).pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(this.CACHE_TIMEOUT)
      })
    );
  }

  save = (entity: Product): Observable<Product> => {
    console.log('entity', entity)
    if (entity.id) {
      return this.http.put<Product>(`${environment.bff}/v1/products`, entity)
              .pipe(map(this.success));
    } else {
      return this.http.post<Product>(`${environment.bff}/v1/products`, entity)
              .pipe(map(this.success));
    }
  }

  check = (entity: Partial<Product>): Observable<void> => {
    return this.http.post<void>(`${environment.bff}/v1/products/check`, entity);
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

  public success = (product: Product): Product => {
    this.router.navigate(['/products']);
    return product;
  }
}
