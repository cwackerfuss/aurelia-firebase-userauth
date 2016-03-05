// src/posts.js
import Firebase from 'github:firebase/firebase-bower@2.4.1';
import $ from 'jquery';

export class Post {

  heading = 'Post';
  firebase = new Firebase('https://wackerfuss-usersite.firebaseio.com');


  activate(params, routeConfig){
    var postId = params.id;
    this.postRef = this.firebase.child("posts/" + postId);

    this.postRef.on("value", (snapshot) => {
      this.post = snapshot.val();
      console.log(this);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  }



}
