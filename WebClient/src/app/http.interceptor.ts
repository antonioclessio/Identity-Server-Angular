import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { OidcFacade } from 'ng-oidc-client';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor (private oidcFacade: OidcFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcFacade.identity$.pipe(
      switchMap(user => {
        if (user && !user.expired && user.access_token) {
          req = req.clone({
            setHeaders: {
              Authorization: `${user.token_type} ${user.access_token}`
            }
          });
        }
        return next.handle(req);
      })
    );    
  }
}
