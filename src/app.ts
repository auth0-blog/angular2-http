import {Component, View, bootstrap, provide} from 'angular2/angular2';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

class CredentialsModel {
  username: string;
  password: string;
}

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
    <form #f="form" (ng-submit)="authenticate(f.value)">
      <div ng-control-group="credentials">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          ng-control="username"
          required>

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          ng-control="password"
          required>
      </div>

      <button>Login!</button>

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
  credentials: Object = new CredentialsModel();
  quote: string;
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

}

bootstrap(App, [HTTP_PROVIDERS]);
