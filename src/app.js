import Firebase from 'github:firebase/firebase-bower@2.4.1';
import {Redirect} from 'aurelia-router';

export class App {

  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['', 'posts'], name: 'posts', moduleId: 'posts/index', nav: true, title: 'Posts', auth: true },
      { route: 'register', name: 'register', moduleId: 'register', nav: false, title: 'Sign Up' },
      { route: 'login', name: 'login', moduleId: 'login', nav: false, title: 'Log In' },
      { route: 'posts/:id', name: 'post', moduleId: 'posts/post', nav: false, title: 'Post' },
      { route: 'new', name: 'newpost', moduleId: 'new-post', nav: true, title: 'New Post', auth: true },
      { route: 'account-settings', name: 'accountSettings', moduleId: 'account-settings', nav: false, title: 'Account Settings', auth: true },
    ]);

    this.router = router;
  }
}

class AuthorizeStep {

  firebase = new Firebase('http://wackerfuss-usersite.firebaseio.com');

  run(navigationInstruction, next) {

    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      let isLoggedIn = this.firebase.getAuth();
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
