import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        ProductService,
        MatSnackBar
      ]
    });

    productService = TestBed.inject(ProductService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });
});
