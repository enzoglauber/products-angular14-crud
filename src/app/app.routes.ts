import { ExtraOptions, Routes } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  // {
  //   path: 'products',
  //   component: ProductListComponent
  // },
  {
    path: '**',
    redirectTo: 'products'
  }
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: QuicklinkStrategy
}

// QuicklinkModule,
//     RouterModule.forRoot([…], {
//       preloadingStrategy: QuicklinkStrategy
//     })
