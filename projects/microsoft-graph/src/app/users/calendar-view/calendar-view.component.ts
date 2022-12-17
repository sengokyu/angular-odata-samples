import { Component } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { Event } from 'microsoft-graph';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'microsoft-graph-calendar-view',
  templateUrl: './calendar-view.component.html',
  styles: [],
})
export class CalendarViewComponent {
  events$?: Observable<Array<Event> | undefined>;

  constructor(private client: ODataClient) {}

  load(): void {
    const now = new Date();
    const startDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).toISOString();
    const endDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ).toISOString();
    const path = `me/calendarview`;

    const service = this.client.entitySet<Event>(path);

    this.events$ = service
      .query((q) => q.select(['subject']))
      .fetchAll({ params: { startDateTime, endDateTime } })
      .pipe(map(({ entities }) => entities));
  }
}
