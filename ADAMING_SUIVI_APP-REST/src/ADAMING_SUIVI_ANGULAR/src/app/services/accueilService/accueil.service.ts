import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccueilService {

  constructor(private http: HttpClient) { }
  getNombreCVRrelancer(page,size): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.http.post(BACK_END_URL+'/accueil/ReportingChargeRelance'+ "?page=" + page + "&size=" + size, httpOptions);
  }
  getSessionreporting() {
   
    return this.http.get<any>(BACK_END_URL+'/accueil/Sessionreporting');
  }

  getSourceurTechnologies () {
    return this.http.get<any>(BACK_END_URL+'/accueil/SourceurTechnologies');
  }

  getChart() {
    return this.http.get<any>(BACK_END_URL+'/accueil/map');
  }
  getCVRelanceByCharge(id){
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatParCharge?idcharge='+ id);
  }
  getCandidatSession (session) {
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatSession?idsession=' + session);
  }
}
