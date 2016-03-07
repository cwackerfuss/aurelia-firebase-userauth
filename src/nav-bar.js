import {bindable, inject} from 'aurelia-framework';
import {Auth} from 'services/auth';

@inject(Auth)
export class NavBar {
@bindable router;

  constructor(auth) {
    this.auth = auth;
  }

  logout() {
    this.auth.logout();
    this.router.navigateToRoute('login');
  }

}
