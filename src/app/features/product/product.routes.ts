import { Routes } from '@angular/router';

import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductComponent } from './product.component';
import { ProductResolver } from './product.resolver';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'new',
        component: ProductNewComponent
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent,
        resolve: {
          product: ProductResolver
        },
      }
    ]
  }
];
