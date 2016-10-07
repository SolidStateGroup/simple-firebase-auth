require('./libs/fb');
require('./libs/gapi');

const Facebook = {
  init: (appId) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.7'
      });
    };
  },
  login: function(permissions) {
    return new Promise((resolve) => {
      if (typeof FB != "undefined") {
        FB.login(function () {
          if (FB.getAccessToken()) {
            resolve(FB.getAccessToken());
          }
        }, { scope: permissions || 'public_profile,email' });
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

const Google = {
  init: (apiKey, clientId) => {
    this.apiKey = apiKey;
    this.clientId = clientId;
  },
  login: () => {
    return new Promise((resolve) => {
      gapi.client.setApiKey(this.apiKey);
      gapi.auth.authorize({
        'client_id': this.clientId,
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

export default { Facebook, Google };
