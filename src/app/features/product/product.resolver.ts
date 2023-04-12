import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productService: ProductService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.paramMap.get('id');
    if (!!id) {
      return this.productService.getOne(id).pipe(
        catchError((error) => {
          this.router.navigate(['']);
          return EMPTY;
        })
      );
    } else {
      return EMPTY;
    }
  }
}
