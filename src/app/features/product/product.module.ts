import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PRODUCT_ROUTES } from './product.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PRODUCT_ROUTES)
  ],
  declarations: [
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent
  ]
})
export class ProductModule { }
