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

  vote(postId, voteType) {

    this.auth.thisUserRef.child("votes").child(postId).once('value').then((snapshot) => {

      if (snapshot.exists()) {
        // do nothing
        console.log("Already Voted");
      } else {
        this.addVoteToPost(postId, voteType);
      };

    }, (error) => {
      console.log("The read failed: " + error.code);
    });

  }

  addVoteToPost(postId, voteType) {

    var postVoteRef = this.auth.postsRef.child(postId);

    if (voteType === 'upvote') {
      postVoteRef = postVoteRef.child('upvotes');
    } else {
      postVoteRef = postVoteRef.child('downvotes');
    }

    postVoteRef.once('value').then((snapshot) => {
      return snapshot.val();
    }).then((voteValue) => {
      voteValue += 1;
      postVoteRef.set(voteValue);
    }).then(() => {
      this.addVoteToUser(postId, voteType);
    });

  }

  addVoteToUser(postId, voteType) {
    var userVoteRef = this.auth.thisUserRef.child('votes');
    userVoteRef.child(postId).set(voteType);
  }

}
