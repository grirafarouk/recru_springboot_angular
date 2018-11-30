import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';
import { Lieu } from '../../models/Lieu';

@Injectable({
  providedIn: 'root'
})
export class LieuxService {

  constructor(private httpClient: HttpClient) { }

  findAllLieux(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/lieu/all");
  }
  save(lieu): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/lieu/add", lieu, httpOptions);
  }

  update(lieu): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/lieu/update", lieu, httpOptions);
  }

  delete(lieu): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/lieu/" + lieu.id);
  }
}
