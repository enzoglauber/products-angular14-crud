import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  Event,
  NavigationEnd,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryService } from '@features/category/category.service';
import { FakeMediaMatcher } from '@helpers/stubby/fake-midia';
import { expectEvents, onlyNavigationStartAndEnd, SimpleCmp } from '@helpers/stubby/simple.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { of, ReplaySubject } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let categoryService: CategoryService;
  let mediaMatcher: FakeMediaMatcher;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const event$ = new ReplaySubject<RouterEvent>(1);

  describe(`default`, () => {
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
          CategoryService
        ]
      }).compileComponents();

      categoryService = TestBed.inject(CategoryService);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should get all categories', () => {
      spyOn(categoryService, 'getAll').and.returnValue(of([]));
      component.ngOnInit();
      expect(categoryService.getAll).toHaveBeenCalled();
    });

    it('should navigate to the current URL', fakeAsync(inject([Router], (router: Router) => {
      router.onSameUrlNavigation = 'reload';
      router.resetConfig([
        {path: '', component: SimpleCmp},
        {path: 'simple', component: SimpleCmp},
      ]);

      const events: Event[] = [];
      router.events.subscribe(e => onlyNavigationStartAndEnd(e) && events.push(e));

      router.navigateByUrl('/simple');
      tick();

      expectEvents(events, [
        [NavigationStart, '/simple'], [NavigationEnd, '/simple'],
      ]);
    })));

    it('should call start event', () => {
      event$.next(new ResolveStart(1, 'regular', 'redirectUrl', { url: 'test' } as RouterStateSnapshot));
      expect(component.sidenav.mode).toEqual('over');
    });

    it('should call end event', () => {
      event$.next(new ResolveEnd(2, 'regular', 'redirectUrl', { url: 'test' } as RouterStateSnapshot));
      expect(component.sidenav.mode).toEqual('over');
    });
  })

  describe(`breakpoint`, () => {
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
  })
});

