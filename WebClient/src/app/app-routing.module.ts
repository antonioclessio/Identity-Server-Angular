import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from './app-route.guard';
import { MainComponent } from './main/main.component';
import { SessionComponent } from './session/session.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SignoutComponent } from './signout/signout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canLoad: [AppRouteGuard],
    canActivate: [AppRouteGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'session',
    component: SessionComponent
  },
  {
    path: 'refresh',
    component: RefreshComponent
  },
  {
    path: 'signout',
    component: SignoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
