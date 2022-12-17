import { Component } from '@angular/core';
import { ODataServiceFactory } from 'angular-odata';
import { Presence, User } from 'microsoft-graph';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  myProfile$?: Observable<User | null>;
  users$?: Observable<Array<User>>;
  user$?: Observable<User | null>;
  presence$?: Observable<Presence | null>;

  constructor(private factory: ODataServiceFactory) {}

  loadMyProfile(): void {
    const service = this.factory.singleton<User>('me');

    this.myProfile$ = service
      .entity()
      .query((q) => q.select(['displayName', 'id']))
      .fetchEntity();
  }

  loadUsers(): void {
    const service = this.factory.entitySet<User>('users');

    this.users$ = service
      .entities()
      .query((q) => q.filter("userType eq 'Member'"))
      .query((q) => q.select(['displayName', 'id', 'userType', 'mail']))
      .fetchAll()
      .pipe(map(({ entities }) => entities));
  }

  loadUser(id: string): void {
    const service = this.factory.singleton<User>(`users/${id}`);

    this.user$ = service.entity().fetchEntity();

    this.loadPresence(id);
  }

  loadPresence(id: string): void {
    const service = this.factory.singleton<Presence>(`users/${id}/presence`);

    this.presence$ = service.entity().fetchEntity();
  }
}
