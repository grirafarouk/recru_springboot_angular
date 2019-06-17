import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  constructor(private httpClient: HttpClient) { }

  findAllStatut(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/statut");
  }
  findStatutByLibelle(libelle: String): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/statut/libelle/" + libelle)
  }
  save(Statut): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/statut/add", Statut, httpOptions);
  }
  

  update(Statut): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/statut/update", Statut, httpOptions);
  }
  searchingStatuts(value):Observable<any>{

    return this.httpClient.get(BACK_END_URL + "/statut/recherche/"+value );

  }
  delete(item): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/statut/" + item.id);
  }

}

