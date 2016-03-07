import {Auth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, Auth)
export class Login {

  heading = 'Log In';
  email = '';
  password = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }

  post() {
    this.auth.firebase.authWithPassword({
      email    : this.email,
      password : this.password
    }, (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
        this.toggleFormError(error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        this.auth.getAccountDetails();
        this.router.navigate('posts');
      }
    });
  }

  toggleFormError(error) {
    this.hasFormError = true;
    this.formErrorMessage = error;
  }

}
