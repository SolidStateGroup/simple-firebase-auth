# Simple Firebase Auth

Simplified Firebase authentication for web with support for Facebook & Google login.

Using this module alongside Firebase means there is no need to write and host any backend code to handle users logging in to your app.

Use our project starter repository (https://github.com/SolidStateGroup/firebase-project-starter) to help you get started setting up your own Firebase project.

## Install
```
$ npm install --save firebase simple-firebase-auth
```

## Project Setup

You will need to initialise Firebase within your app in the usual way. See https://firebase.google.com/docs/web/setup

## Example Usage (with React)

```
import * as firebase from 'firebase';
import FireAuth from 'simple-firebase-auth';

constructor(props) {
  super(props);
  FireAuth.init(firebase, {
    fbAppId: "<FACEBOOK_APP_ID>",
    webClientId: "<FIREBASE_WEB_CLIENT_ID>",
    apiKey: "<FIREBASE_API_KEY>"
  });
}

componentDidMount() {
  FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError);
}

register = () => {
  const { email, password, firstName, lastName } = this.state;
  FireAuth.register(email, password, { firstName, lastName });
}

login = () => {
  FireAuth.login(this.state.email, this.state.password);
}

facebookLogin() {
  FireAuth.facebookLogin();
}

googleLogin() {
  FireAuth.googleLogin();
}

logout() {
  FireAuth.logout();
}

update () => {
  FireAuth.update({
    firstName: this.state.firstName,
    lastName: this.state.lastName
  }).then(() => {
    ...
  }).catch(err => {
    ...
  });
}

resetPassword () => {
  FireAuth.resetPassword(this.state.email)
    .then(() => {
      ...
    })
    .catch(err => {
      ...
    });
}

updatePassword () => {
  FireAuth.updatePassword(this.state.password)
    .then(() => {
      ...
    })
    .catch(err => {
      ...
    });
}

```
