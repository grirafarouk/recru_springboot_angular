import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';

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
  getCVRelanceByCharge(id){
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatParCharge?idcharge='+ id);
  }
  getCandidatSession (session) {
    return this.http.get<any>(BACK_END_URL+'/accueil/CandidatSession?idsession=' + session);
  }
}
