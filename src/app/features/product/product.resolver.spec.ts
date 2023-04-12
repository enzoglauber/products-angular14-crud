import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { Product } from './product';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

const PRODUCT: Product = {
  id: '1',
  code: '2',
  name: 'Eda Abshire 22',
  category: 3,
};

describe('ProductResolver', () => {
  let productResolver: ProductResolver;
  let productService: ProductService;
  let router: Router;
  let routeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [ProductResolver, ProductService],
    });
  });

  describe(`when ID is not null`, () => {
    beforeEach(() => {
      const paramMap = convertToParamMap({ id: '1' });
      routeMock = { paramMap } as ActivatedRouteSnapshot;

      TestBed.overrideProvider(ActivatedRoute, { useValue: routeMock });

      productResolver = TestBed.inject(ProductResolver);
      productService = TestBed.inject(ProductService);
      router = TestBed.inject(Router);
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

    it('should get one product with failure', fakeAsync(() => {
      let current: Product | undefined;
      jest.spyOn(router, 'navigate');
      jest
        .spyOn(productService, 'getOne')
        .mockReturnValue(throwError(() => new Error('{exit:true}')));

      tick(500);
      productResolver.resolve(routeMock).subscribe((response) => {
        current = response;
      });

      expect(current).toBeUndefined();
      expect(router.navigate).toHaveBeenCalledWith(['']);
    }));
  });

  describe(`when ID is null`, () => {
    beforeEach(() => {
      const paramMap = convertToParamMap({ id: null });
      routeMock = { paramMap } as ActivatedRouteSnapshot;

      TestBed.overrideProvider(ActivatedRoute, { useValue: routeMock });
      router = TestBed.inject(Router);
      productResolver = TestBed.inject(ProductResolver);
    });

    it('should be ID is null', fakeAsync(() => {
      let current: Product | undefined;

      tick(500);
      productResolver.resolve(routeMock).subscribe((response) => {
        current = response;
      });

      expect(current).toBeUndefined();
    }));
  });
});
