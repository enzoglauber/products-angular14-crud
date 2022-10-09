import { Routes } from '@angular/router';

import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/add',
    component: ProductAddComponent
  },
  {
    path: 'products/:id',
    component: ProductEditComponent
  }
];
