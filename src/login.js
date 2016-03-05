import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {FirebaseAuth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, FirebaseAuth)
export class Login {

  heading = 'Log In';
  email = '';
  password = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, firebaseAuth) {
    this.router = router;
    this.auth = firebaseAuth;
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
        this.auth.getAccount();
        this.router.navigate('posts');
      }
    });
  }

  toggleFormError(error) {
    this.hasFormError = true;
    this.formErrorMessage = error;
  }

}
