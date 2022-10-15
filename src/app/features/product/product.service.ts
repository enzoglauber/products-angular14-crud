import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  share,
  switchMap,
  tap,
  timer,
} from 'rxjs';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getAll = () => {
    const params = this.params(this.filter)
    return this.http.get<Product[]>(`${environment.bff}/v1/products`, {params}).pipe(
      map(this.nextProducts)
    );
  }

  getOne = (id: string | undefined) => {
    return this.http.get<Product>(`${environment.bff}/v1/products/${id}`).pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(this.CACHE_TIMEOUT)
      })
    );
  }

  save = (entity: Partial<Product>): Observable<Product> => {
    console.log('entity', entity)
    if (entity.id) {
      return this.http.put<Product>(`${environment.bff}/v1/products`, entity)
              .pipe(map(this.success));
    } else {
      return this.http.post<Product>(`${environment.bff}/v1/products`, entity)
              .pipe(map(this.success));
    }
  }

  delete = (entity: Partial<Product>): Observable<Partial<Product> | void> => {
    console.log('delete', entity);
    const url = `${environment.bff}/v1/products/${entity.id}`
    return this.http.delete<Product>(url).pipe(
      tap(() => {
        this.snackBar.open('Removed successfully!', undefined, {duration: 3000});
        this.router.navigate(['/products']);
      })
    );
  }

  check = (entity: Pick<Product, 'code'>): Observable<{exist: boolean}> => {
    return this.http.post<{exist: boolean}>(`${environment.bff}/v1/products/check`, entity);
  }

  get all$(): Observable<Product[]> {
    return this.filter$.pipe(
      switchMap(this.getAll)
    );
  }

  public setFilter = (value: ProductFilter): void => {
    this._filter.next(value);
  }

  private nextProducts = (value: Product[]): Product[] => {
    this._products.next(value);
    return value;
  }

  private params = (req: Object) => {
    let parms = new HttpParams();
    return Object.entries(req).reduce((params, [key, value]) => {
      params = (!!value) ? params.append(key, value.toString()) : params;
      return params;
    }, parms);
  }


  success = (product: Product): Product => {
    this.snackBar.open('Saved successfully!', undefined, {duration: 3000});
    this.router.navigate(['/products']);
    return product;
  }
}
