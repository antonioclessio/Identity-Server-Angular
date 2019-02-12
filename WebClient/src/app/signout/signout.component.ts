import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements AfterViewInit {

  constructor() { console.log('SignoutComponent'); }

  ngAfterViewInit() {
    var Oidc = (window as any).Oidc;
    var config = {
      userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
    }
    if ((Oidc && Oidc.Log && Oidc.Log.logger)) {
      Oidc.Log.logger = console;
    }
    var isPopupCallback = JSON.parse(window.localStorage.getItem('ngoidc:isPopupCallback'));
    if (isPopupCallback) {
      new Oidc.UserManager(config).signoutPopupCallback();
    } else {
      new Oidc.UserManager(config).signoutRedirectCallback().then(test => {
        window.location.href = '/';
      });
    }
  }

}
