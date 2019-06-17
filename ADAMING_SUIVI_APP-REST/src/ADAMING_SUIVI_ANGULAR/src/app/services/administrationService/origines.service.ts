import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class OriginesService {

  constructor(private httpClient: HttpClient) { }

  findAllOrigines(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/origine");
  }
  findOrigineByLibelle(libelle: string): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/origine/libelle/" + libelle)
  }
  save(origine): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/origine/add", origine, httpOptions);
  }


  searchingorigines(value): Observable<any> {

    return this.httpClient.get(BACK_END_URL + "/origine/recherche/" + value);

  }

  update(origine): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/origine/update", origine, httpOptions);
  }

  delete(origine): Observable<any> {

    return this.httpClient.delete(BACK_END_URL + "/origine/" + origine.id);
  }
}
