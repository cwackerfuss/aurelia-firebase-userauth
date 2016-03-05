import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {FirebaseAuth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, FirebaseAuth)
export class Newpost {

  title = '';
  description = '';
  date = '';

  constructor(router, firebaseAuth) {
    this.router = router;
    this.auth = firebaseAuth;
    this.account = this.auth.getAccount();
    console.log(this.account);
  }

  sanitizeTitleForUrl(title) {
    var whitespace = new RegExp('[ ]', 'ig');
    var irregulars = new RegExp('[^A-Z0-9-]', 'ig');
    var leadingDash = new RegExp('^-', 'ig');
    var trailingDash = new RegExp('-$', 'ig');
    var urlTitle = title.trim().replace(whitespace, '-').replace(irregulars, '').replace(leadingDash, '').replace(trailingDash, '').toLowerCase();
    return urlTitle;
  }

  post(){

    var urlTitle = this.sanitizeTitleForUrl(this.title);

    this.auth.firebase.child("posts").child(urlTitle).set({
      title: this.title,
      description: this.description,
      author: this.account.email,
      date: Date()
    });

    this.auth.firebase.child("users").child(this.account.uid).child("posts").push().set({
      title: urlTitle
    });

    this.router.navigate('posts');

  }

}
