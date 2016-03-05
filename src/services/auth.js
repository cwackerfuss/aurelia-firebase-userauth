export class FirebaseAuth {

  firebase = new Firebase('http://wackerfuss-usersite.firebaseio.com');

  constructor() {
    this.authData = this.firebase.getAuth();
  }




  getAccount() {

    var authData = this.firebase.getAuth();

    if (authData) {
      this.account = {
        isLoggedIn: true,
        email: authData.password.email,
        username: authData.password.email,
        avatar: authData.password.profileImageURL,
        uid: authData.uid
      }
    } else {
      this.account = {
        isLoggedIn: false
      }
    }
    return this.account;
  }


  logout() {
    this.firebase.unauth();
    this.getAccount();
  }

}
