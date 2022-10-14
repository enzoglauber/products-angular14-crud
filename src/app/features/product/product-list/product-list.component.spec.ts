import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryPipe } from '@features/category/category.pipe';

import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatIconModule,
        MatOptionModule,
        MatFormFieldModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule
      ],
      declarations: [
        ProductAddComponent,
        ProductListComponent,
        ProductFilterComponent,
        CategoryPipe
      ],
      providers:[
        ProductService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
