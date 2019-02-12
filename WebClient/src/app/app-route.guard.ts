import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OidcFacade } from 'ng-oidc-client';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppRouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private oidcFacade: OidcFacade
  ) { }

  private checkCanAccess(): Observable<boolean> {
    return this.oidcFacade.identity$.pipe(
      first(),
      switchMap(user => {
        if (user && !user.expired) {
          return of(true);
        } else {
          this.router.navigate(['/session']);
          return of(false);
        }
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(loading => {
        return this.checkCanAccess()
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(loading => {
        return this.checkCanAccess()
      })
    );
  }
}
