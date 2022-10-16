import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductNewComponent } from './product-new.component';

const PRODUCT: Product = {
  id: 'wyufgxymsc',
  code: '0',
  name: 'Eda Abshire',
  category: 3
};

describe('ProductNewComponent', () => {
  let component: ProductNewComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatSnackBarModule,
      ],
      providers: [
        ProductService
      ],
      declarations: [ ProductNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductNewComponent);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submited a valid form to save', () => {
    const {id, ...product} = PRODUCT
    jest.spyOn(productService, 'save')
    component.form.patchValue(PRODUCT);
    component.save()
    expect(productService.save).toHaveBeenCalledWith(product);
  });

  it('should submited an invalid code to verify the existence', fakeAsync(() => {
    const code = '66';
    const control = component.code;
    const spy = jest.spyOn(productService, 'check').mockReturnValue(
      throwError(() => new Error("{exit:true}"))
    );

    control?.setValue(code);
    control?.markAsTouched();

    component.check(component.code).subscribe();

    tick(500);
    expect(control?.value).toEqual(code);
    expect(component.form.invalid).toBeTruthy();
    expect(control?.errors?.['exist']).toBeTruthy();
    expect(spy).toHaveBeenCalledWith({code});
  }));

  it('should be returned undefined when the control is null', () => {
    let current: any;
    component.check(null).subscribe((items) => {
      current = items;
    });

    expect(current).toBeUndefined();
  });
});
