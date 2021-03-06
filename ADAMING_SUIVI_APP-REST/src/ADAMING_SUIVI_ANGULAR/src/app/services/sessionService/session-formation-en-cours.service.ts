import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationEnCoursService {

  constructor(private http: HttpClient) { }

  getSessionFormation(sfec){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/sessionsformations/rechercherSessionFormation', sfec , httpOptions);
  }

  getSessionFormationEnCours(sfec){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/sessionsformations/sessionFormationEnCours', sfec , httpOptions);
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

  rechercherFormations (formation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL +'/formation/rechercherFormations', formation,httpOptions);
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

  getAllSessions(){
    return this.http.get<any>(BACK_END_URL+'/sessionsformations/AllSessions');
  }

}
