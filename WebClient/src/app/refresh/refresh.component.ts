import { Component, OnInit, AfterViewInit } from '@angular/core';

declare let Oidc: any;

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements AfterViewInit {

  constructor() { console.log('RefreshComponent'); }

  ngAfterViewInit() {
    var config = {
      userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
    }
    new Oidc.UserManager(config).signinSilentCallback().catch(function (e) {
        console.error(e);
    });
  }

}
