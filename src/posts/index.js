// src/posts.js
import Firebase from 'github:firebase/firebase-bower@2.4.1';
import $ from 'jquery';

export class Posts {

  firebase = new Firebase('https://wackerfuss-usersite.firebaseio.com');
  postsRef = this.firebase.child("posts");
  posts = [];
  heading = 'Posts';

  constructor() {

    this.postsRef.on("value", (snapshot) => {
      this.posts = snapshot.val();
      this.posts = Object.keys(this.posts).map( (key) => {
        this.posts[key].id = key;
        return this.posts[key];
      });
      console.log(this);
    });

  }

  attached() {
    this.checkAuth();
  }

  checkAuth() {
    var authInfo = this.firebase.getAuth();
    if (authInfo) {
      console.log(authInfo, " is currently logged in.");
    }
  }

}
