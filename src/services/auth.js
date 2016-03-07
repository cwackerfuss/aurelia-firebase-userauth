import Firebase from 'github:firebase/firebase-bower@2.4.1';

export class Auth {


  constructor() {
    this.firebase = new Firebase('http://wackerfuss-usersite.firebaseio.com');
    this.usersRef = this.firebase.child("users");
    this.postsRef = this.firebase.child("posts");
    this.account = null;
    this.getAccountDetails();
  }

  getAccountDetails() {

    var authData = this.firebase.getAuth();

    if (authData) {
      this.account = {
        email: authData.password.email,
        avatar: authData.password.profileImageURL,
        uid: authData.uid
      };

      this.thisUserRef = this.firebase.child(this.account.uid);

    } else {
      this.account = null;
    };

  }

  logout() {
    this.firebase.unauth();
    this.getAccountDetails();
  }

  upvote() {

    if (authData) {
      this.firebase.child("users").child(uuid).once("value", (snap) => {
        console.log(snap);
      })
      return true;
    } else {
      return false;
    }
  }

}
