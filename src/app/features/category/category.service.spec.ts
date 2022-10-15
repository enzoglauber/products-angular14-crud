import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';

import { Category } from './category';
import { CategoryService } from './category.service';

const URL = `${environment.bff}/v1/categories`;
const CATEGORIES: Category[] = [{
  id: 1,
  name: 'Atacado'
}];

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[
        CategoryService
      ]
    });
    categoryService = TestBed.inject(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  it('should get all categories', () => {
    let current: Category[] | undefined;

    categoryService.getAll()
      .subscribe((items) => {
        current = items;
      });

      const test = http.expectOne(URL);
      test.flush(CATEGORIES);
      http.verify();

      expect(current).toEqual(categoryService.categories);
  });
});
