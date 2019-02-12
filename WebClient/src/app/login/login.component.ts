import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  identity$: Observable<User>;

  constructor(
    private oidcFacade: OidcFacade,
    private route: Router
  ) {
    this.identity$ = this.oidcFacade.identity$;
  }

  ngOnInit(): void {
    this.oidcFacade.getOidcUser();
  }

  ngAfterViewInit(): void {
    let Oidc = (window as any).Oidc;
    let config = {
      userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
    }

    if ((Oidc && Oidc.Log && Oidc.Log.logger)) {
      Oidc.Log.logger = console;
    }

    const manager = new Oidc.UserManager(config)
    const signing = manager.signinRedirectCallback()
    signing.then(user => {
      this.route.navigate(['/']);
    });
  }

}
