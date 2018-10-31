import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL, BACK_END_URL_SECURITY } from '../helper/application.constant';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME, USER_NAME } from '../helper/auth.constant';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from '../models/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static AUTH_TOKEN = BACK_END_URL_SECURITY + '/oauth/token';

  constructor(private httpClient: HttpClient, private utilisateurService: UtilisateurService) { }

  login(login): Observable<any> {
    const body = `username=${encodeURIComponent(login.username)}&password=${encodeURIComponent(login.pwd)}&grant_type=password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
      })
    };
    return this.httpClient.post(AuthenticationService.AUTH_TOKEN, body, httpOptions)
      .pipe(map(async (data: any) => {
        if (data) {  // login successful if there's a jwt token in the response
          let tokenInfo = this.getDecodedAccessToken(data.access_token); // decode token
          localStorage.setItem(TOKEN_NAME, data.access_token);
        await this.utilisateurService.getUser(tokenInfo.user_name).toPromise().then((user: Utilisateur) => {
            if (user) {
              var currentUser = {
                token: data,
                userInfo: user
              }
              localStorage.setItem(USER_NAME, JSON.stringify(currentUser))
              
            }
            return user;
          })
         
        }
        return data;
      }))
  }



  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
  logout() {
    localStorage.removeItem(USER_NAME)
    localStorage.removeItem(TOKEN_NAME)
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = this.getDecodedAccessToken(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
