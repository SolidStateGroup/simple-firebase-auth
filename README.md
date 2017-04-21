# Simple Firebase Auth

[![Join the chat at https://gitter.im/SolidStateGroup/simple-firebase-auth](https://badges.gitter.im/SolidStateGroup/simple-firebase-auth.svg)](https://gitter.im/SolidStateGroup/simple-firebase-auth?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
**For react-native check out https://github.com/SolidStateGroup/react-native-firebase-auth**

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
import FireAuth from 'simple-firebase-auth';

constructor(props) {
  super(props);
  FireAuth.init({
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

# Getting Help
If you encounter a bug or feature request we would like to hear about it. Before you submit an issue please search existing issues in order to prevent duplicates. 

# Contributing
For more information about contributing PRs, please see our <a href="CONTRIBUTING.md">Contribution Guidelines</a>.


# Get in touch
If you have any questions about our projects you can email <a href="mailto:projects@solidstategroup.com">projects@solidstategroup.com</a>.
