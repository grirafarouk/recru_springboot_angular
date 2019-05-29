import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class disponibiliteService {

  constructor(private httpClient: HttpClient) { }

  findAllDisponibilite(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/disponibilite/all");
  }
  findDisponibiliteByLibelle(libelle: String): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/disponibilite/libelle/" + libelle)
  }
  save(Disponibilite): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/disponibilite/add", Disponibilite, httpOptions);
  }
  update(Disponibilite): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/disponibilite/update", Disponibilite, httpOptions);
  }

  delete(item): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/disponibilite/" + item.id);
  }

}

