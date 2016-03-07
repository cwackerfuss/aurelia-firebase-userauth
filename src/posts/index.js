import {Auth} from 'services/auth';
import {inject} from 'aurelia-framework';

@inject(Auth)
export class Posts {

  posts = [];
  heading = 'Posts';

  constructor(auth) {

    this.auth = auth;

    this.auth.postsRef.on("value", (snapshot) => {
      this.posts = snapshot.val();
      this.posts = Object.keys(this.posts).map( (key) => {
        this.posts[key].id = key;
        return this.posts[key];
      });
      console.log(this);
    });

  }

}
