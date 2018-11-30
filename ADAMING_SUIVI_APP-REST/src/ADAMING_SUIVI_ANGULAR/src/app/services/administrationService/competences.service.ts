import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {

  constructor(private httpClient: HttpClient) { }

  findAllCompetences(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/competence/all");
  }
  save(competence): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/competence/add", competence, httpOptions);
  }
  update(competence): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/competence/update", competence, httpOptions);
  }

  delete(competence): Observable<any> {

    return this.httpClient.delete(BACK_END_URL + "/competence/"+competence.id );
  }
}
