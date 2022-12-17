import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userData$?: Observable<any>;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.getUserData();
  }

  logoff(): void {
    this.oidcSecurityService.logoff().subscribe(() => {});
  }
}
