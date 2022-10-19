import { Component } from '@angular/core';
import { Event, NavigationEnd, NavigationStart } from '@angular/router';

const expectEvents = (events: Event[], pairs: any[]) => {
  expect(events.length).toEqual(pairs.length);
  for (let i = 0; i < events.length; ++i) {
    expect((<any>events[i].constructor).name).toBe(pairs[i][0].name);
    expect((<any>events[i]).url).toBe(pairs[i][1]);
  }
}

const onlyNavigationStartAndEnd = (e: Event): boolean => {
  return e instanceof NavigationStart || e instanceof NavigationEnd;
}

@Component({selector: 'simple-cmp', template: `simple`})
class SimpleCmp {
}

export { expectEvents, onlyNavigationStartAndEnd, SimpleCmp };
