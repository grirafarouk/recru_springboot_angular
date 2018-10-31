import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class SessionsFormationsService {

  constructor(private http: HttpClient) { }

  getSessionsFormations(){
   return this.http.get<any>(BACK_END_URL+'/sessionsformations');
  }

  getFicheSessionFormation(session){
    return this.http.get<any>(BACK_END_URL+'/sessionsformations/CandidatParSession?id=' + session);
  }
  
  getsessionFormationEnCours(sessionFormation){
    return this.http.post<any>(BACK_END_URL+'/sessionsformations/sessionFormationEnCours',sessionFormation);
  }

  NombreParticipants(session): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL+'/sessionsformations/nbreparticipants', session , httpOptions);
  }

  getListCandidats(session): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL+'/sessionsformations/listeCandidats', session , httpOptions);

  }

}
