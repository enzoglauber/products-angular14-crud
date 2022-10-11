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
  feedback: any = {};
  filter = new ProductFilter();
  displayedColumns = ['id', 'code', 'name', 'category'];

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.product.getProducts();
    // this.search();
  }

  // delete(Product: Product): void {
  //   if (confirm('Are you sure?')) {
  //     this.ProductService.delete(Product).subscribe(() => {
  //         this.feedback = {type: 'success', message: 'Delete was successful!'};
  //         setTimeout(() => {
  //           this.search();
  //         }, 1000);
  //       },
  //       err => {
  //         this.feedback = {type: 'warning', message: 'Error deleting.'};
  //       }
  //     );
  //   }
  // }

}
