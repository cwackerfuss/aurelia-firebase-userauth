import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Auth} from 'services/auth';
import {RandomPosts} from 'random-posts';

@inject(Router, Auth)
export class Newpost {

  title = '';
  description = '';
  date = '';

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
    this.randomPosts = RandomPosts;
    console.log("New Post Object: ", this);
  }

  fillForm() {
    let randomPost = this.randomPosts[Math.floor((Math.random() * this.randomPosts.length) + 1)];
    this.title = randomPost['Title'];
    this.description = randomPost['Description'];
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

    // save to posts
    this.auth.postsRef.child(urlTitle).set({
      title: this.title,
      description: this.description,
      author: this.auth.account.email,
      upvotes: 1,
      downvotes: 0,
      date: Date()
    });

    // save to user's posts
    this.auth.usersRef.child(this.auth.account.uid).child('posts').child(urlTitle).set(true);

    // save to user's votes
    this.auth.usersRef.child(this.auth.account.uid).child('votes').child(urlTitle).set('upvote');

    this.router.navigate('posts');

  }

}
