import {Auth} from 'services/auth';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router, Auth)
export class AccountSettings {

  heading = 'Account Settings';
  email = '';
  password = '';
  hasFormError = false;
  formErrorMessage = '';

  constructor(router, auth) {
    this.router = router;
    this.auth = auth;
  }


  handleFileSelect(evt) {

    var f = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var filePayload = e.target.result;
        // Generate a location that can't be guessed using the file's contents and a random number
        var hash = Math.random();

        // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
        this.auth.firebase.child('images').child(hash).child('filePayload').set(filePayload, function() {
          this.imageFile = filePayload.val();
          console.log(filePayload.val());
        });
      };
    })(f);
    reader.readAsDataURL(f);
  }

}
