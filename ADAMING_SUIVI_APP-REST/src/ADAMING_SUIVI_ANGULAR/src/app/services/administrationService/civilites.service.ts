import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class CivilitesService {

  constructor(private httpClient: HttpClient) { }

  findAllCivilites(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/civilites");
  }
  save(civilite): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/civilites/add", civilite, httpOptions);
  }
  update(civilite): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/civilites/update", civilite, httpOptions);
  }

  delete(civilite): Observable<any> {

    return this.httpClient.delete(BACK_END_URL + "/civilites/"+civilite.id );
  }
}
