import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CategoryService } from '@features/category/category.service';
import { ProductService } from '@features/product/product.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private subs: Subscription = new Subscription();
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver,
    private productService: ProductService,
    private categoryService: CategoryService,

  ) {}

  ngOnInit(): void {
    this.subs.add(this.productService.getAll().subscribe());
    this.subs.add(this.categoryService.getAll().subscribe());
  }

  ngAfterViewInit() {
    this.breakpoint
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((exactly) => {
        if (exactly.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
