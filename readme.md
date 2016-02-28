# Angular 2 Http
## Based on [ng2-play.ts](https://github.com/pkozlowski-opensource/ng2-play)

This is the code for [Auth0's tutorial on Angular 2 Http](). The tutorial covers how to make `GET` and `POST` requests, and how to set some options such as modified headers.

## Intallation

```bash
git submodule update --init
cd server 
npm install
node server.js
```

## Running the App
```
cd ..
npm install
gulp play
```

The app will be served at `localhost:9000`.

Some examples:

```js
// app.ts

getRandomQuote() {
  this.http.get('http://localhost:3001/api/random-quote')
    .subscribe(
      data => this.randomQuote = data.text(),
      err => this.logError(err.text()),
      () => console.log('Random Quote Complete')
    );
}

authenticate(username, password) {

  let creds = JSON.stringify({ username: username.value, password: password.value });

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:3001/sessions/create', creds, {
    headers: headers
    })
    .subscribe(
      data => {
        this.saveJwt(data.json().id_token);
        username.value = null;
        password.value = null;
      },
      err => this.logError(err.json().message),
      () => console.log('Authentication Complete')
    );
  }

getSecretQuote() {

  let jwt = localStorage.getItem('id_token');
  let authHeader = new Headers();
  if(jwt) {
    authHeader.append('Authorization', 'Bearer ' + jwt);      
  }

  this.http.get('http://localhost:3001/api/protected/random-quote', {
    headers: authHeader
  })
  .subscribe(
    data => this.secretQuote = data.text(),
    err => this.logError(err.text()),
    () => console.log('Secret Quote Complete')
  );

  }
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
