import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@features/category/category.service';
import { catchError, EMPTY, map, mergeMap, Observable, of, timer } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  categories$ = this.categoryService.categories$;
  form!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const validators = [Validators.required];
    const asyncValidators = [this.check];

    this.form = new FormGroup({
      id: new FormControl('', {validators}),
      code: new FormControl('', {validators, asyncValidators}),
      name: new FormControl('', {validators}),
      category: new FormControl('', {validators}),
    });

    this.activatedRoute.data
        .pipe(map((data) => data['product']))
        .subscribe((product) => this.form.patchValue(product));
  }

  get code(): AbstractControl<any> | null {
    return this.form.get('code');
  }

  save = () => {
    const entity = this.form.getRawValue();
    this.productService.save(entity).subscribe();
  }

  delete(): void {
    if (confirm('Are you sure?')) {
      const entity = this.form.getRawValue();
      this.productService.delete(entity).subscribe();
    }
  }

  check = (control: AbstractControl | null): Observable<any> => {
    if (!!control) {
      return timer(350).pipe(
        mergeMap(() => this.productService.check({ code: control.value })),
        catchError(this.failure)
      );
    } else {
      return EMPTY;
    }
  }

  failure = ({error}: HttpErrorResponse): any => {
    return of({exist: true});
  }
}
