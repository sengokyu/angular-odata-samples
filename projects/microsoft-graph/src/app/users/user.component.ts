import { Component } from '@angular/core';
import { ODataServiceFactory } from 'angular-odata';
import { User } from 'microsoft-graph';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent {
  myProfile$?: Observable<User | null>;
  users$?: Observable<Array<User>>;
  user$?: Observable<User | null>;

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
      .query((q) => q.select(['displayName', 'id']))
      .fetchAll()
      .pipe(map(({ entities }) => entities));
  }

  loadUser(id: string | undefined): void {
    const service = this.factory.singleton<User>(`users/${id}`);

    this.user$ = service
      .entity()
      .query((q) => q.select(['displayName']))
      .fetchEntity();
  }
}
