import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
        authWellknownEndpointUrl:  `https://login.microsoftonline.com/${TENANT_ID}/v2.0/`,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: CLIENT_ID,
        scope: 'openid email profile https://graph.microsoft.com/.default',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: false,
        issValidationOff: true,
        // Necessary for validating id token
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        customParamsAuthRequest: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
