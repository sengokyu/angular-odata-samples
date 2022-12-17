import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ODataClient } from 'angular-odata';
import { DateTimeTimeZone, ScheduleInformation } from 'microsoft-graph';
import { Observable } from 'rxjs';

interface GetScheduleParam {
  Schedules: Array<string>;
  EndTime: DateTimeTimeZone;
  StartTime: DateTimeTimeZone;
  AvailabilityViewInterval: number;
}

@Component({
  selector: 'microsoft-graph-schedule',
  templateUrl: './schedule.component.html',
  styles: [],
})
export class ScheduleComponent {
  schedules$?: Observable<Array<ScheduleInformation> | null>;

  constructor(private route: ActivatedRoute, private client: ODataClient) {}

  load(): void {
    const smtpAddress = this.route.snapshot.paramMap.get('smtpAddress');
    const path = `me/calendar/getSchedule`;
    const param = this.getDateTimeParam() as GetScheduleParam;

    param.Schedules = [smtpAddress!];

    this.schedules$ = this.client
      .action<GetScheduleParam, ScheduleInformation>(path)
      .callEntities(param);
  }

  private getDateTimeParam(): {
    StartTime: DateTimeTimeZone;
    EndTime: DateTimeTimeZone;
  } {
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
    const timeZone = 'Tokyo Standard Time';

    return {
      StartTime: { dateTime: startDateTime, timeZone },
      EndTime: { dateTime: endDateTime, timeZone },
    };
  }
}
