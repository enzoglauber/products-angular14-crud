import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpoint: BreakpointObserver
  ) {}

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
}
