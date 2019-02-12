import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  identity$: Observable<User>;
  loading$: Observable<boolean>;
  expiring$: Observable<boolean>;
  expired$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  errors$: Observable<any>;
  
  constructor(private oidcFacade: OidcFacade) {
    this.loading$ = this.oidcFacade.loading$;
    this.expiring$ = this.oidcFacade.expiring$;
    this.expired$ = this.oidcFacade.expired$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.errors$ = this.oidcFacade.errors$;
    this.identity$ = this.oidcFacade.identity$;
  }

  ngOnInit(): void {
    this.oidcFacade.getOidcUser();
  }
  
}
