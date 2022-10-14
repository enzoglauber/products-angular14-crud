import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductResolver } from './product.resolver';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
    });
    resolver = TestBed.inject(ProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
