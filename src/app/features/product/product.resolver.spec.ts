import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Product } from './product';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

const PRODUCT: Product = {
  id: '1',
  code: '2',
  name: 'Eda Abshire 22',
  category: 3
};

describe('ProductResolver', () => {
  let productResolver: ProductResolver;
  let productService: ProductService;

  let paramMap = new Map([['id', '1']]);
  let routeMock: any = { snapshot: {}, paramMap };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        ProductResolver,
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: routeMock
        }
      ]
    });
    productResolver = TestBed.inject(ProductResolver);
    productService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(productResolver).toBeTruthy();
  });

  it('should get one product with success', () => {
    jest.spyOn(productService, 'getOne').mockReturnValue(of(PRODUCT));
    let current: Product | undefined;
    productResolver.resolve(routeMock).subscribe((response) => {
      current = response;
    });
    expect(current).toBe(PRODUCT);
  });
});
