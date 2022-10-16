import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductService } from '../product.service';
import { ProductFilter } from './product-filter';
import { ProductFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule,
        MatSnackBarModule
      ],
      declarations: [ ProductFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterComponent);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submited an empty form', () => {
    jest.spyOn(productService, 'setFilter');
    const value: ProductFilter = { category: '', code: '' };

    component.submit();
    expect(productService.setFilter).toHaveBeenCalledWith(value);
  });

  it('should submited with category filter', () => {
    jest.spyOn(productService, 'setFilter');
    const value: ProductFilter = { category: '1', code: '' };
    component.form.patchValue(value);

    component.submit();
    expect(productService.setFilter).toHaveBeenCalledWith(value);
  });


  it('should submited with code filter', () => {
    jest.spyOn(productService, 'setFilter');
    const value: ProductFilter = { category: '', code: '22' };
    component.form.patchValue(value);

    component.submit();
    expect(productService.setFilter).toHaveBeenCalledWith(value);
  });
});
