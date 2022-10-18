import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from '@features/category/category.service';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let categoryService: CategoryService;
  let mediaMatcher: FakeMediaMatcher;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        CategoryService,
        {provide: MediaMatcher, useClass: FakeMediaMatcher}
      ]
    }).compileComponents();

    categoryService = TestBed.inject(CategoryService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MediaMatcher], (mm: FakeMediaMatcher) => {
    mediaMatcher = mm;
  }));

  afterEach(() => {
    mediaMatcher.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all categories', () => {
    jest.spyOn(categoryService, 'getAll');
    component.ngOnInit();
    expect(categoryService.getAll).toHaveBeenCalled();
  });

  it('should emit false when the media query does not match', (done) => {
    mediaMatcher.setMatchesQuery('(max-width: 800px)', false);

    component.breakpoint$.subscribe((state) => {
      expect(state.matches).toBeFalsy();
      done();
    });
  });

  it('should emit true when the media query does match', (done) => {
    mediaMatcher.setMatchesQuery('(max-width: 800px)', true);

    component.breakpoint$.subscribe((state) => {
      expect(state.matches).toBeTruthy();
      done();
    });
  });
});
export class FakeMediaQueryList {
  /** The callback for change events. */
  private _listeners: ((mql: MediaQueryListEvent) => void)[] = [];

  constructor(public matches: boolean, public media: string) {}

  /** Toggles the matches state and "emits" a change event. */
  setMatches(matches: boolean) {
    this.matches = matches;

    /** Simulate an asynchronous task. */
    setTimeout(() => {
      this._listeners.forEach(listener => listener(this as any));
    });
  }

  /** Registers a callback method for change events. */
  addListener(callback: (mql: MediaQueryListEvent) => void) {
    this._listeners.push(callback);
  }

  /** Removes a callback method from the change events. */
  removeListener(callback: (mql: MediaQueryListEvent) => void) {
    const index = this._listeners.indexOf(callback);

    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }
}

@Injectable()
export class FakeMediaMatcher {
  /** A map of match media queries. */
  private _queries = new Map<string, FakeMediaQueryList>();

  /** The number of distinct queries created in the media matcher during a test. */
  get queryCount(): number {
    return this._queries.size;
  }

  /** Fakes the match media response to be controlled in tests. */
  matchMedia(query: string): FakeMediaQueryList {
    const mql = new FakeMediaQueryList(true, query);
    this._queries.set(query, mql);
    return mql;
  }

  /** Clears all queries from the map of queries. */
  clear() {
    this._queries.clear();
  }

  /** Toggles the matching state of the provided query. */
  setMatchesQuery(query: string, matches: boolean) {
    if (this._queries.has(query)) {
      this._queries.get(query)!.setMatches(matches);
    } else {
      throw Error('This query is not being observed.');
    }
  }
}
