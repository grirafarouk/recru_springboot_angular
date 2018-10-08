import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationEnCoursService {

  constructor(private http: HttpClient) { }

  getSessionFormationEnCours(sfec){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/sessionsformations/sessionFormationEnCoursparformation', sfec , httpOptions);
  }

  getSessionFormationClotures(sfec){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/sessionsformations/sessionFormationCloturee', sfec , httpOptions);
  }

  NombreParticipants(session){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/sessionsformations/nbreparticipants', session , httpOptions);
  }

  rechercherSessionFormationencours (formation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/formation/formationencours', formation,httpOptions);
  }

  rechercherSessionFormationenclotures (formation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/formation/formationclotures', formation,httpOptions);
  }

}
