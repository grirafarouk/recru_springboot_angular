import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class OriginesService {

  constructor(private httpClient: HttpClient) { }

  findAllOrigines(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/origine");
  }
  save(origine): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/origine/add", origine, httpOptions);
  }
  update(origine): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/origine/update" , origine, httpOptions);
}
}
