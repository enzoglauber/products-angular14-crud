import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  search(): void {
    this.productService.products$.subscribe(console.log);
    // this.ProductService.load(this.filter);
  }

}
