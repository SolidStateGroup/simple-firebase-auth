# React Firebase Authentication

Simplified Firebase authentication with support for social platform login.

## Install
```
$ npm install firebase react-firebase-auth --save
```

## Usage

```
import FireAuth from 'react-native-firebase-auth';

constructor(props) {
  super(props);
  FireAuth.init(config);
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
