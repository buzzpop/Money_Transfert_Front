import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

const token_key="auth_token";
const api_login= environment.api_login;
const jwt= new  JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false)

  constructor(private storage: Storage, private http: HttpClient, private router: Router) {
  }
  getToken(credentials){
   return  this.http.post(api_login,credentials);
  }

  logIn(token){
   this.storage.set(token_key,token);
    this.storage.set('decodeToken', JSON.stringify(jwt.decodeToken(token)));
   return  this.authenticationState.next(true);
  }
  getTokenOnStorage(key){
   return this.storage.get(key);
  }

  logOut(){
    this.storage.remove('decodeToken');
     this.storage.remove(token_key);
    this.router.navigate(['/authentication']);
    return this.authenticationState.next(false);

  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

}
