import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }

  getListeformationencours(){
    return this.http.get<any>(BACK_END_URL+"/formation/listeformationencours");
  }
  getListeformationclotures(){
    return this.http.get<any>(BACK_END_URL+"/formation/listeformationclotures");
  }
  getAllFormations(){
    return this.http.get<any>(BACK_END_URL+'/formation');
  }

  getFromationParSession(session): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL+'/formation/formationencours', session , httpOptions);
  }

  /*getFormationsCloturee(){
    return this.http.get<any>(BACK_END_URL+'/formation/listeformationclotures');
  }*/

  public ajoutFormation(formation): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL+'/formation', formation,httpOptions);
  }

}
