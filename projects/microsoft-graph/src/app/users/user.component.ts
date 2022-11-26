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
  users$?: Observable<Array<User>>;

  constructor(private factory: ODataServiceFactory) {}

  loadUsers(): void {
    const service = this.factory.entitySet<User>('users');

    this.users$ = service.fetchAll().pipe(map(({ entities }) => entities));
  }
}
