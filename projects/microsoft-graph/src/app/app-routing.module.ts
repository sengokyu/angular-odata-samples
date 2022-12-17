import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ScheduleComponent } from './users/schedule/schedule.component';
import { CalendarViewComponent } from './users/calendar-view/calendar-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AutoLoginAllRoutesGuard],
  },
  {
    path: 'calendarView',
    component: CalendarViewComponent,
    canActivate: [AutoLoginAllRoutesGuard],
  },
  {
    path: 'schedule/:smtpAddress',
    component: ScheduleComponent,
    canActivate: [AutoLoginAllRoutesGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
