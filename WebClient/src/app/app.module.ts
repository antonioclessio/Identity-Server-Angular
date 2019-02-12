import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgOidcClientModule } from 'ng-oidc-client';
import { WebStorageStateStore } from 'oidc-client';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './app-route.guard';
import { HttpServiceInterceptor } from './http.interceptor';
import { MainComponent } from './main/main.component';
import { SessionComponent } from './session/session.component';
import { SignoutComponent } from './signout/signout.component';
import { RefreshComponent } from './refresh/refresh.component';
import { LoginComponent } from './login/login.component';

export interface State {
  router: RouterReducerState;
}

export const rootStore: ActionReducerMap<State> = {
  router: routerReducer
};

export function getWebStorageStateStore() {
  return new WebStorageStateStore({ store: window.localStorage });
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SessionComponent,
    SignoutComponent,
    RefreshComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    StoreModule.forRoot(rootStore),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'ng-oidc-client',
      logOnly: true
    }),
    NgOidcClientModule.forRoot({
      oidc_config: {
        authority: 'https://localhost:44325/',
        client_id: 'angular-client',
        redirect_uri: 'http://localhost:4200/login',
        response_type: 'id_token token',
        scope: 'openid api',
        post_logout_redirect_uri: 'http://localhost:4200/signout',
        silent_redirect_uri: 'http://localhost:4200/refresh',
        accessTokenExpiringNotificationTime: 10,
        automaticSilentRenew: true,
        userStore: getWebStorageStateStore
      }
    })
  ],
  providers: [
    AppRouteGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 