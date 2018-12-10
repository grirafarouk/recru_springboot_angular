import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../helper/application.constant';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME, USER_NAME } from '../helper/auth.constant';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { Utilisateur } from '../models/Utilisateur';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {

    constructor(private httpClient: HttpClient) { }


    getUser(username): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/login/" + username)
    }

    getConnetedUserInfo():Utilisateur {
        if (localStorage.getItem(USER_NAME)) {
            return JSON.parse(localStorage.getItem(USER_NAME)).userInfo
        } else return null;
    }
    getAllUser(): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs")
    }

    save(utilisateur): Observable<any> {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.httpClient.post(BACK_END_URL + "/utilisateurs/add", utilisateur, httpOptions);
      }

      update(utilisateur): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return this.httpClient.post(BACK_END_URL + "/utilisateurs/update" , utilisateur, httpOptions);
    }
    
    getAllSourceurs():Observable<any>{
        return this.httpClient.get(BACK_END_URL +"/utilisateurs/usersourceur");
    }

    getAllChages():Observable<any>{
        return this.httpClient.get(BACK_END_URL +"/utilisateurs/usercharge");
    }


}
