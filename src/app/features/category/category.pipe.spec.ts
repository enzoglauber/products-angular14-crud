import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { Category } from './category';
import { CategoryPipe } from './category.pipe';
import { CategoryService } from './category.service';

const CATEGORIES: Category[] = [{
  id: 1,
  name: 'Atacado'
}];

class CategoryServiceMock implements Partial<ReturnType<() => CategoryService>> {
  _categories = [...CATEGORIES];
  get categories(): Category[] {
    return this._categories
  }

  next = (value: Category[]) =>{
    this._categories = value;
    return value
  }
}

describe('CategoryPipe', () => {
  let pipe: CategoryPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CategoryPipe,
        {
          provide: CategoryService,
          useClass: CategoryServiceMock
        },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
          },
        },
      ],
    });

    pipe = TestBed.inject(CategoryPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should formatted category name', () => {
    const value = 1;
    const formatted = 'Atacado';

    expect(pipe.transform(value)).toEqual(formatted);
  });


  it('should returned same value', () => {
    const value = 0;
    const formatted = '0';
    expect(pipe.transform(value)).toEqual(formatted);
  });

  it('should returned same value with inject',
    inject([CategoryService], (injectService: CategoryService) => {
      injectService.next([])
      expect(injectService.categories).toEqual([]);
      const value = 0;
      const formatted = '0';
      expect(pipe.transform(value)).toEqual(formatted);
    })
  );
});
