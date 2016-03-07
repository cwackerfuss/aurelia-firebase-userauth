import {Auth} from 'services/auth';
import {inject} from 'aurelia-framework';

@inject(Auth)
export class Post {

  heading = 'Post';

  constructor(auth) {
    this.auth = auth;
  }

  activate(params, routeConfig){
    this.getPostData(params.id);
  }

  getPostData(id) {
    let postRef = this.auth.postsRef.child(id);

    postRef.on("value", (snapshot) => {
      this.post = snapshot.val();
      console.log(this);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  }



}
