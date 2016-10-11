# Simple Firebase Auth

Simplified Firebase authentication for web with support for Facebook & Google login. 

Using this module alongside Firebase means there is no need to write and host any backend code to handle users logging in to your app.

Use our project starter repository (https://github.com/SolidStateGroup/firebase-project-starter) to help you get started setting up your own Firebase project.

## Install
```
$ npm install --save firebase simple-firebase-auth
```

## Example Usage (with React)

```
import FireAuth from 'simple-firebase-auth';

constructor(props) {
  super(props);
  FireAuth.init({
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com"
  }, {
    fbAppId: "<APP_ID>",
    googleApiKey: "<API_KEY>",
    googleClientId: "<CLIENT_ID>"
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
