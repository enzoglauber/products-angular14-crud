import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PRODUCT_ROUTES } from './product.routes';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductNewComponent } from './product-new/product-new.component';

const MATERIAL = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ...MATERIAL,
    RouterModule.forChild(PRODUCT_ROUTES)
  ],
  declarations: [
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductFilterComponent,
    ProductNewComponent
  ]
})
export class ProductModule { }
