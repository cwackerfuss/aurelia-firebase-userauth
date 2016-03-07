import {Auth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, Auth)
export class AccountSettings {

  heading = 'Account Settings';
  email = '';
  password = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }

}
