import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  findAllTypeFormation(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/profil");
  }
  findTypeFormationByLibelle(libelle: String): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/profil/libelle/" + libelle)
  }
  save(typeformation): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/profil/add", typeformation, httpOptions);
  }
  update(typeformation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/profil/update", typeformation, httpOptions);
  }

  delete(item): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/profil/" + item.id);
  }

}

