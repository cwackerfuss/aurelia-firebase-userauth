import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {FirebaseAuth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, FirebaseAuth)
export class AccountSettings {

  heading = 'Account Settings';
  email = '';
  password = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, firebaseAuth) {
    this.router = router;
    this.auth = firebaseAuth;
    console.log(this);
    this.account = this.auth.getAccount();
  }

}
