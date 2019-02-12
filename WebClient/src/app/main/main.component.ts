import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'oidc-client';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  identity$: Observable<User>;
  loggedIn$: Observable<boolean>;

  dataResponse: any;

  constructor(
    private oidcFacade: OidcFacade,
    private http: HttpClient
    ) {
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.identity$ = this.oidcFacade.identity$;
  }

  ngOnInit() {
    this.oidcFacade.getOidcUser();
  }

  chamadaAPI(): void {
    this.http.get('http://localhost:49690/api/values').subscribe(response => {
      this.dataResponse = response;
    });
  }

  chamadaAPIRole(): void {
    this.http.get('http://localhost:49690/api/values/role').subscribe(response => {
      this.dataResponse = response;
    });
  }

}
