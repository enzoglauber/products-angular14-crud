import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ProductModule } from '@features/product/product.module';
import { SharedModule } from '@shared/shared.module';
import { QuicklinkModule } from 'ngx-quicklink';

import { AppComponent } from './app.component';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    SharedModule,
    ProductModule,
    QuicklinkModule,
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
