import {bindable, inject} from 'aurelia-framework';
import {FirebaseAuth} from 'services/auth';

@inject(FirebaseAuth)
export class NavBar {
@bindable router;

  constructor(firebaseAuth) {
    this.auth = firebaseAuth;
  }

  attached() {
    this.auth.getAccount();
  }

  logout() {
    this.auth.logout();
    this.router.navigateToRoute('login');
  }

}
