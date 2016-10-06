var firebase = require('firebase');
var Auth = require('./auth');

var FireAuth = new function() {
  this.user = null;
  this.profile = null;
  this.onUserChange = null;
  this.onLogout = null;
  this.onEmailVerified = null;
  this.onLogin = null;
  this.onError = null;

  this.init = function(config) {
    if (!config) {
      console.error('FireAuth must be initialized with a valid firebase configuration object.');
      return;
    }

    firebase.initializeApp(config);
  }

  this.setup = function(onLogin, onUserChange, onLogout, onEmailVerified, onError) {
    this.onUserChange = onUserChange;
    this.onLogout = onLogout;
    this.onEmailVerified = onEmailVerified;
    this.onLogin = onLogin;
    this.onError = onError;

    firebase.auth().onAuthStateChanged((user)=> {

      if (user) {
        // Determine if user needs to verify email
        var emailVerified = user.providerData[0].providerId != 'password' || user.emailVerified;

        // Upsert profile information
        var profileRef = firebase.database().ref(`profiles/${user.uid}`);
        profileRef.update({ emailVerified: emailVerified, email: user.email });

        profileRef.on('value', (profile)=> {
          const val = profile.val();

          // Email become verified in session
          if (val.emailVerified && (this.profile && !this.profile.val().emailVerified)) {
            this.onEmailVerified && this.onEmailVerified();
          }

          if (!this.user) {
            this.onLogin && this.onLogin(user, val); // On login
          } else if (val) {
            this.onUserChange && this.onUserChange(user, val); // On updated
          }

          this.profile = profile; // Store profile
          this.user = user; // Store user
        });

      } else {
        this.profile = null;
        this.user = null; // Clear user and logout
        this.onLogout && this.onLogout();
      }

    });

    Auth.Google.configure();
  }

  this.login = function(email, password) {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  }

  this.register = function(username, password) {
    try {
      firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((user)=> {
          user.sendEmailVerification();
        })
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  }

  this.resendVerification = function() {
    this.user.sendEmailVerification();
  }

  this.facebookLogin = function(permissions) {
    Auth.Facebook.login(permissions)
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
      ))
      .catch((err) => this.onError && this.onError(err));
  }

  this.googleLogin = function() {
    Auth.Google.login()
      .then((token) => (
        firebase.auth()
          .signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, token))
      ))
      .catch((err) => this.onError && this.onError(err));
  }

  this.logout = function() {
    firebase.auth().signOut();
  }

  this.update = function(data) {
    var profileRef = firebase.database().ref(`profiles/${this.user.uid}`);
    return profileRef.update(data);
  }

  this.resetPassword = function(email) {
    firebase.auth().sendPasswordResetEmail(email);
  }

  this.updatePassword = function(password) {
    this.user.updatePassword(password);
  }

  this.linkWithGoogle = function() {
    // @TODO
  }

  this.linkWithFacebook = function() {
    // @TODO
  }

  this.linkWithEmail = function() {
    // @TODO
  }
};

module.exports = FireAuth;
