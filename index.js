import Auth from './auth';

const FireAuth = {
  firebase: null,
  user: null,
  profile: null,
  onUserChange: null,
  onLogout: null,
  onEmailVerified: null,
  onLogin: null,
  onError: null,

  init: (firebase, config) => {
    if (!firebase) {
      console.error('FireAuth must be initialised with Firebase');
      return;
    }
    if (!config || !config.fbAppId || !config.webClientId || !config.apiKey) {
      console.error('FireAuth must be initialised with valid configuration for Facebook and Google APIs');
      return;
    }

    this.firebase = firebase;

    // Initialise Facebook api
    Auth.Facebook.init(config.fbAppId);

    // Initialise Google api
    Auth.Google.init(config.apiKey, config.webClientId);
  },

  setup: (onLogin, onUserChange, onLogout, onEmailVerified, onError) => {
    this.onUserChange = onUserChange;
    this.onLogout = onLogout;
    this.onEmailVerified = onEmailVerified;
    this.onLogin = onLogin;
    this.onError = onError;

    this.firebase.auth().onAuthStateChanged((user)=> {

      if (user) {
        // Determine if user needs to verify email
        var emailVerified = user.providerData[0].providerId != 'password' || user.emailVerified;

        // Upsert profile information
        var profileRef = this.firebase.database().ref(`profiles/${user.uid}`);
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
  },

  login: (email, password) => {
    try {
      this.firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  },

  register: (username, password) => {
    try {
      this.firebase.auth().createUserWithEmailAndPassword(username, password)
        .then((user)=> {
          user.sendEmailVerification();
        })
        .catch((err) => this.onError && this.onError(err));
    } catch (e) {
      this.onError && this.onError(e);
    }
  },

  resendVerification: () => {
    this.user.sendEmailVerification();
  },

  facebookLogin: (permissions) => {
    Auth.Facebook.login(permissions)
      .then((token) => (
        this.firebase.auth()
          .signInWithCredential(this.firebase.auth.FacebookAuthProvider.credential(token))
      ))
      .catch((err) => this.onError && this.onError(err));
  },

  googleLogin: () => {
    Auth.Google.login()
      .then((token) => (
        this.firebase.auth()
          .signInWithCredential(this.firebase.auth.GoogleAuthProvider.credential(null, token))
      ))
      .catch((err) => this.onError && this.onError(err));
  },

  logout: () => {
    this.firebase.auth().signOut();
  },

  update: (data) => {
    var profileRef = this.firebase.database().ref(`profiles/${this.user.uid}`);
    return profileRef.update(data);
  },

  resetPassword: (email) => {
    this.firebase.auth().sendPasswordResetEmail(email);
  },

  updatePassword: (password) => {
    this.user.updatePassword(password);
  },

  linkWithGoogle: () => {
    // @TODO
  },

  linkWithFacebook: () => {
    // @TODO
  },

  linkWithEmail: () => {
    // @TODO
  }
};

module.exports = FireAuth;
