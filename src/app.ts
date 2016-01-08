import { bootstrap } from 'angular2/platform/browser';
import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Component({
  selector: 'app'
})
@View({
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],  
  template: `
  <header>
    <h1 class="title">Angular 2 HTTP</h1>
  </header>

  <section>
    <h2>Login</h2>
    <form role="form">
      <div ng-control-group="credentials">
        <label for="username">Username</label>
        <input
          type="text"
          #username
          id="username"
          ng-control="username"
          required>

        <label for="password">Password</label>
        <input
          type="password"
          #password
          id="password"
          ng-control="password"
          required>
      </div>

      <button (click)="authenticate(username, password)">Login!</button>

    </form>
  </section>

  <section>
    <h2>Random Quote</h2>
    <hr>
    <h3>{{ randomQuote }}</h3>
    <button (click)="getRandomQuote()">Get Random Quote!</button>
  <section>

  <section>
    <h2>Secret Quote</h2>
    <hr>
    <h3>{{ secretQuote }}</h3>
    <button (click)="getSecretQuote()">Get Secret Quote!</button>
  <section>
  `
})

export class App {
  title: string;
  data: string;
  quote: string;
  username: string;
  password: string;
  randomQuote: string;
  secretQuote: string;

  constructor(public http: Http) {

  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  saveJwt(jwt) {
    if(jwt) {
      localStorage.setItem('id_token', jwt)
    }
  }

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

    var headers = new Headers();
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

    var jwt = localStorage.getItem('id_token');
    var authHeader = new Headers();
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

}

bootstrap(App, [HTTP_PROVIDERS]);
