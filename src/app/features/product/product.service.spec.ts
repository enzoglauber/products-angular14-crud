import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';

import { Product } from './product';
import { ProductFilter } from './product-filter/product-filter';
import { PRODUCT_ROUTES } from './product.routes';
import { ProductService } from './product.service';

const URL = `${environment.bff}/v1/products`;
const FILTER: ProductFilter = { code: '0', category: '3' };
const PRODUCTS: Product[] = [ {
  id: 'wyufgxymsc',
  code: '0',
  name: 'Eda Abshire',
  category: 3
}];

describe('ProductService', () => {
  let productService: ProductService;
  let matSnackBar: MatSnackBar;
  let http: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(PRODUCT_ROUTES),
        NoopAnimationsModule,
        MatSnackBarModule
      ],
      providers: [
        ProductService,
        MatSnackBar
      ]
    });

    productService = TestBed.inject(ProductService);
    matSnackBar = TestBed.inject(MatSnackBar);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should get all products', () => {
    let current: Product[] | undefined;
    productService.getAll()
      .subscribe((items) => {
        current = items;
      });

    const test = http.expectOne(URL);
    test.flush(PRODUCTS);
    http.verify();

    expect(current).toEqual(productService.products);
  });

  it('should get all products with filter', () => {
    let current: Product[] | undefined;
    const params = productService['params'](FILTER)

    productService.setFilter(FILTER);
    productService.getAll().subscribe();
    productService.all$
    .subscribe((products) => {
      expect(products).toEqual(PRODUCTS);
    });

    const test = http.expectOne(`${URL}?${params}`);
    test.flush(PRODUCTS);
    http.verify();
  });

  it('should get one product', () => {
    let current: Product | undefined;
    const [PRODUCT] = PRODUCTS;
    const {id} = PRODUCT;

    productService.getOne(id)
      .subscribe((item) => {
        current = item;
      });

    const test = http.expectOne(`${URL}/${id}`);
    test.flush(PRODUCT);
    http.verify();

    expect(current).toEqual(PRODUCT);
  });

  it('should save (:PUT) product', (done) => {
    const [PRODUCT] = PRODUCTS;
    const SNACK = ['Saved successfully!', undefined, {duration: 3000}]

    jest.spyOn(matSnackBar, 'open');
    jest.spyOn(router, 'navigate');

    productService.save(PRODUCT)
    .subscribe((product) => {
      expect(product).toEqual(PRODUCT);
      expect(test.request.method).toEqual('PUT');

      expect(matSnackBar.open).toHaveBeenCalledWith(...SNACK);
      expect(router.navigate).toHaveBeenCalledWith(['/products']);

      done();
    });

    const test = http.expectOne(URL);
    test.flush(PRODUCT);
    http.verify();
  });

  it('should save (:POST) product', (done) => {
    const [{id, ...PRODUCT}] = PRODUCTS;
    const SNACK = ['Saved successfully!', undefined, {duration: 3000}]

    jest.spyOn(matSnackBar, 'open');
    jest.spyOn(router, 'navigate');

    productService.save(PRODUCT)
    .subscribe((product) => {
      expect(product).toEqual(PRODUCT);
      expect(test.request.method).toEqual('POST');

      expect(matSnackBar.open).toHaveBeenCalledWith(...SNACK);
      expect(router.navigate).toHaveBeenCalledWith(['/products']);

      done();
    });

    const test = http.expectOne(URL);
    test.flush(PRODUCT);
    http.verify();
  });

  it('should remove (:DELETE) product', (done) => {
    const [PRODUCT] = PRODUCTS;
    const {id} = PRODUCT;
    const SNACK = ['Removed successfully!', undefined, {duration: 3000}]

    jest.spyOn(matSnackBar, 'open');
    jest.spyOn(router, 'navigate');

    productService.delete(PRODUCT)
    .subscribe((partial) => {
      expect(partial).toEqual({id});
      expect(test.request.method).toEqual('DELETE');

      expect(matSnackBar.open).toHaveBeenCalledWith(...SNACK);
      expect(router.navigate).toHaveBeenCalledWith(['/products']);

      done();
    });

    const test = http.expectOne(`${URL}/${id}`);
    test.flush({id});
    http.verify();
  });

  it('should check the existence of code product', (done) => {
    const CHECK = {exist: true};
    const [{code}] = PRODUCTS;

    productService.check({code})
    .subscribe((response) => {
      expect(response).toEqual(CHECK);
      expect(test.request.method).toEqual('POST');
      done();
    });

    const test = http.expectOne(`${URL}/check`);
    test.flush(CHECK);
    http.verify();
  });
});
