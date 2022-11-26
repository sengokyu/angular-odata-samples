import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenInterceptor } from './access-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { HomeComponent } from './home/home.component';
import { MsGraphApiModule } from './ms-graph-api.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserComponent } from './users/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule,
    MsGraphApiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
