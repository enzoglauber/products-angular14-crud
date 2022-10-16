import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, distinctUntilChanged, map, ReplaySubject, share, timer } from 'rxjs';

import { Category } from './category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  CACHE_TIMEOUT = 2000;

  private _categories = new BehaviorSubject<Category[]>([]);
  public categories$ = this._categories.asObservable().pipe(distinctUntilChanged());
  get categories(): Category[] {
    return this._categories.getValue()
  }

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(`${environment.bff}/v1/categories`).pipe(
      map(this.next),
      share({
        connector: () => new ReplaySubject(1),
        resetOnComplete: () => timer(this.CACHE_TIMEOUT)
      })
    );
  }

  next = (value: Category[]): Category[] => {
    this._categories.next(value);
    return value;
  }
}
