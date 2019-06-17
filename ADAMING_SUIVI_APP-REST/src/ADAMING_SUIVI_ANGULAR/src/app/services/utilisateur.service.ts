import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../helper/application.constant';
import { Utilisateur } from '../models/Utilisateur';
import { USER_NAME } from '../helper/auth.constant';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {

    constructor(private httpClient: HttpClient) { }


    public getUserByLogin(username): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/login/" + username)
    }

    public getUserByEmail(email): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/email/" + email + "/")
    }
    completeUser(query): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/recherche/" + query);
    }

    public getConnetedUserInfo(): Utilisateur {
        if (localStorage.getItem(USER_NAME)) {
            return JSON.parse(localStorage.getItem(USER_NAME)).userInfo
        } else return null;
    }

    public getAllUser(): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/all")
    }

    public searchingusers(utilisateur): Observable<any> {

        return this.httpClient.post(BACK_END_URL + "/utilisateurs/listeusers", utilisateur, httpOptions);
    }


    public save(utilisateur): Observable<any> {
        return this.httpClient.post(BACK_END_URL + "/utilisateurs/add", utilisateur, httpOptions);
    }

    public update(utilisateur): Observable<any> {
        return this.httpClient.post(BACK_END_URL + "/utilisateurs/update", utilisateur, httpOptions);
    }

    public getAllSourceurs(): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/usersourceur");
    }

    public getAllChages(): Observable<any> {
        return this.httpClient.get(BACK_END_URL + "/utilisateurs/usercharge");
    }


}
