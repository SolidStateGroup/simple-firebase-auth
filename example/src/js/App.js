import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import FireAuth from '../../../';
//import FireAuth from '../../../dist/';

import LoginForm from './LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    FireAuth.init({
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com"
    }, {
      fbAppId: 123456789012,
      googleApiKey: "<API_KEY>",
      googleClientId: "<CLIENT_ID>"
    });
  }

  onLogin = (user, profile) => {
    this.setState({
      isLoading: false,
      user,
      profile
    });
  }

  onUserChange = (user, profile) => {
    this.setState({
      user,
      profile
    });
  }

  onLogout = () => {
    this.setState({
      isLoading: false,
      user: null,
      profile: null
    });
  }

  componentDidMount() {
    FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, () => alert('Email verified!'), this.onError);
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>
          Simple Login Example
        </h1>
        {!this.state.profile ? (
          <div>
            <button disabled={this.state.isLoading} onClick={() => FireAuth.facebookLogin()}>
              Facebook
            </button>
            <button disabled={this.state.isLoading} onClick={() => FireAuth.googleLogin()}>
              Google
            </button>
            <hr />
            <LoginForm
              onRegister={(email, password) => FireAuth.register(email, password) }
              onLogin={(email, password) => FireAuth.login(email, password) } />
            <hr />
          </div>
        ) : (
            <div>
              {!this.state.profile.emailVerified && (
                <div>
                  <button onClick={FireAuth.resendVerification}>
                    Resend Verification Email
                  </button>
                </div>
              ) }

              <button onClick={FireAuth.logout}>
                Logout
              </button>
            </div>
          ) }
      </div>
    );
  }
};

App.propTypes = {};

export default App;
