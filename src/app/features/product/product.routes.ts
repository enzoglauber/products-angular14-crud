import { Routes } from '@angular/router';

import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'products/new',
    component: ProductNewComponent
  },
  {
    path: 'products/:id',
    component: ProductEditComponent
  }
];
