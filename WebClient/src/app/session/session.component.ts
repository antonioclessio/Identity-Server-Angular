import { Component, OnInit } from '@angular/core';
import { OidcFacade } from 'ng-oidc-client';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private oidcFacade: OidcFacade) {}

  ngOnInit() {
    this.oidcFacade.signinRedirect();
  }

}
