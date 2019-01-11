import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccueilService {

  constructor(private http: HttpClient) { }
  getNombreCVRrelancer() {
    
    return this.http.get<any>(BACK_END_URL+'/accueil/ReportingChargeRelance');
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

  getNombreTechnologieParCandidat(): Observable<any> {
    return this.http.get<any>(BACK_END_URL+'/accueil/NombreTechnologieParCandidat');
  }

  getCVRelanceByCharge(id){
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatParCharge?idcharge='+ id);
  }
  getCandidatSession (session) {
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatSession?idsession=' + session);
  }
}
