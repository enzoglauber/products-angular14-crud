import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { ProductFilter } from '../product-filter/product-filter';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  filter = new ProductFilter();  displayedColumns = ['id', 'code', 'name', 'category'];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
  }
}
