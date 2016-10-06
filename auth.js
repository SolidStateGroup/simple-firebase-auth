require('./libs/fb');
require('./libs/gapi');

var Facebook = {
  login: function(permissions) {
    return new Promise((resolve) => {
      if (typeof FB != "undefined") {
        FB.login(function () {
          if (FB.getAccessToken()) {
            resolve(FB.getAccessToken());
          }
        }, { scope: 'public_profile,email' });
        return true;
      } else {
        return false;
      }
    });
  },
  logout: () => {
    return new Promise((resolve) => {
      if (typeof FB != "undefined") {
        FB.logout((response) => {
          resolve();
          return true;
        });
      } else {
        return false;
      }
    });
  }
}

var Google = {
  login: () => {
    return new Promise((resolve) => {
      gapi.client.setApiKey(Project.google.APIKey);
      gapi.auth.authorize({
        'client_id': Project.google.clientID,
        scope: 'email profile',
        prompt: 'select_account'
      }, function (r) {
        if (r.access_token) {
          resolve(r.access_token);
        }
      });
    });
  }
}

exports = { Facebook, Google };
