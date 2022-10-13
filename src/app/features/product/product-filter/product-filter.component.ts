import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '@features/category/category.service';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$ = this.categoryService.categories$;
  form!: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      code: [''],
      category: ['']
    });

    this.productService.setFilter(this.form.getRawValue());
  }

  submit(): void {
    this.productService.setFilter(this.form.getRawValue());
  }
}
