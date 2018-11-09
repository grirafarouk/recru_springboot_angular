import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class TechnologieService {

  constructor(private httpClient: HttpClient) { }
  getTechnologiesByLibelle () {
    return this.httpClient.get<any>(BACK_END_URL+'/technologie/Libelle');
  }
  findAllTechnologies(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/technologie");
  }
  save(technologie): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/technologie/add", technologie, httpOptions);
  }
  update(technologie): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/technologie/update" , technologie, httpOptions);
}

delete(item): Observable<any> {
  return this.httpClient.delete(BACK_END_URL + "/technologie/" + item.id);
}

  
}

