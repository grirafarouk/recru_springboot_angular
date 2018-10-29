import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class TypeFormationService {

  constructor(private http: HttpClient) { }
  
  findAllTypeFormation(): Observable<any> {
    return this.http.get(BACK_END_URL + "/typeformation");
  }
  save(typeformation): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(BACK_END_URL + "/typeformation/add", typeformation, httpOptions);
  }
  update(typeformation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(BACK_END_URL + "/typeformation/update" , typeformation, httpOptions);
}
  
}

