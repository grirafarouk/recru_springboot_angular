import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class ClientSessionService {

  constructor(private httpClient:HttpClient) { }

  
  findAllClientSession(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/clientSession");
  }

  save(clientSession): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/clientSession/add", clientSession, httpOptions);
  }
  update(clientSession): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/clientSession/update" , clientSession, httpOptions);
}

delete(clientSession): Observable<any> {
  return this.httpClient.delete(BACK_END_URL + "/clientSession/" + clientSession.id);
}
  
}
