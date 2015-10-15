# Angular 2 Http
## Based on [ng2-play.ts](https://github.com/pkozlowski-opensource/ng2-play)

This is the code for [Auth0's tutorial on Angular 2 Http](). The tutorial covers how to make `GET` and `POST` requests, and how to set some options such as modified headers.

Some examples:

```js
// app.ts

getRandomQuote() {
  this.http.get('http://localhost:3001/api/random-quote')
    .map(res => res.text())
    .subscribe(
      data => this.randomQuote = data,
      err => this.logError(err),
      () => console.log('Random Quote Complete')
    );
}

authenticate(data) {
  var username = data.credentials.username;
  var password = data.credentials.password;

  var creds = "username=" + username + "&password=" + password;

  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  this.http.post('http://localhost:3001/sessions/create', creds, {
    headers: headers
    })
    .map(res => res.json())
    .subscribe(
      data => this.saveJwt(data.id_token),
      err => this.logError(err),
      () => console.log('Authentication Complete')
    );
}

getSecretQuote() {

  var jwt = localStorage.getItem('id_token');
  var authHeader = new Headers();
  if(jwt) {
    authHeader.append('Authorization', 'Bearer ' + jwt);      
  }

  this.http.get('http://localhost:3001/api/protected/random-quote', {
    headers: authHeader
  })
  .map(res => res.text())
  .subscribe(
    data => this.secretQuote = data,
    err => this.logError(err),
    () => console.log('Secret Quote Complete')
  );

}
```

## Installation

Clone the repo and install dependencies

```bash
npm install
```

Next, install the server dependencies.

```bash
git submodule update --init
cd server
npm install
node server.js
```

## Play

After completing installation, use the `play` task to start the app.

```bash
cd ..
gulp play
```

The app will be served at `localhost:9001`.

## License
MIT

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