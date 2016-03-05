import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {FirebaseAuth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, FirebaseAuth)
export class Register {

  heading = 'Register';
  email = '';
  password = '';
  fullName = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, firebaseAuth) {
    this.router = router;
    this.auth = firebaseAuth;
  }

  toggleFormError(error) {
    this.hasFormError = true;
    this.formErrorMessage = error;
  }

  post() {
    this.auth.firebase.createUser({
      email    : this.email,
      password : this.password
    }, (error, userData) => {
      if (error) {
        //console.log("Error creating user:", error);
        this.toggleFormError(error);
      } else {
        console.log("Successfully created user account with: ", userData);
        this.addUser(userData.uid);
        this.router.navigate('posts');
      }
    });
  }

  addUser(uid) {
    this.auth.firebase.child("users").child(uid).set({
      name: this.email.replace(/@.*/, ''),
      fullName: this.fullName
    });
  }





}
