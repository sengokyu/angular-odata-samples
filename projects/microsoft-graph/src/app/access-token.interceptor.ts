import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MsGraphApiConfig } from './ms-graph-api.config';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(MsGraphApiConfig.serviceRootUrl)) {
      return next.handle(request);
    }

    // Set Authorization header
    return this.oidcSecurityService
      .getAccessToken()
      .pipe(
        switchMap((token) => next.handle(this.cloneRequest(request, token)))
      );
  }

  private cloneRequest(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
