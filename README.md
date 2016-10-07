# Simple Firebase Authentication

Simplified Firebase authentication with support for social platform login.

## Install
```
$ npm install firebase simple-firebase-auth --save
```

## Usage (with React)

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
