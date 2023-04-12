import { ExtraOptions, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

export const APP_ROUTES: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: QuicklinkStrategy,
};
