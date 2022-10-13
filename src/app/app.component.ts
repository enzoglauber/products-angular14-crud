import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { CategoryService } from '@features/category/category.service';
import { ProductService } from '@features/product/product.service';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, map, mergeWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;

  private subs: Subscription = new Subscription();
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs.add(this.productService.getAll().subscribe());
    this.subs.add(this.categoryService.getAll().subscribe());

    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );

    this.isLoading$ = this._showLoaderEvents$.pipe(
      mergeWith(this._hideLoaderEvents$)
    );
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
