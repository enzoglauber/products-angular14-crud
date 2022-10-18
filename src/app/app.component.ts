import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { CategoryService } from '@features/category/category.service';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, map, mergeWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  progress$!: Observable<boolean>;
  breakpoint$!: Observable<BreakpointState>;
  private _showProgressEvent$!: Observable<boolean>;
  private _hideProgressEvent$!: Observable<boolean>;

  private subs: Subscription = new Subscription();
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs.add(this.categoryService.getAll().subscribe());

    this._showProgressEvent$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );
    this._hideProgressEvent$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );

    this.progress$ = this._showProgressEvent$.pipe(
      mergeWith(this._hideProgressEvent$)
    );
  }

  ngAfterViewInit() {
    this.breakpoint$ = this.breakpoint
      .observe(['(max-width: 800px)'])
      .pipe(delay(1));

    this.breakpoint$.subscribe(this.mode);
  }

  mode = (state: BreakpointState) => {
    if (state.matches) {
      this.sidenav.mode = 'over';
      this.sidenav.close();
    } else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
