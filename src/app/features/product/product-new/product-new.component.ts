import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '@features/category/category.service';
import { catchError, mergeMap, Observable, of, timer } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {
  categories$ = this.categoryService.categories$;
  form!: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const validators = [Validators.required];
    const asyncValidators = [this.check];

    this.form = new FormGroup({
      code: new FormControl('', {validators, asyncValidators}),
      name: new FormControl('', {validators}),
      category: new FormControl('', {validators}),
    });
  }

  get code() {
    return this.form.get('code');
  }

  save = () => {
    const entity = this.form.getRawValue();
    this.productService.save(entity).subscribe();
  }

  check = (control: AbstractControl): Observable<any> => {
    return timer(350).pipe(
      mergeMap(() => this.productService.check({ code: control.value })),
      catchError(this.failure)
    );
  }

  failure = ({error}: HttpErrorResponse): any => {
    return of({exists: true});
  }
}
