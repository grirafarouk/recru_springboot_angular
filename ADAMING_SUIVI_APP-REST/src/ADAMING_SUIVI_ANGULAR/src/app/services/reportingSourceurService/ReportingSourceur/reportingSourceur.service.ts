import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class ReportingSourceurService {

  constructor(private httpClient:HttpClient) { }

  
  findReportingSourceur(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/listeReporting");
  }
  findAllSourceur(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/listeReportingSourceur");
  }
  getChartTechnologies(): Observable<any>  {
    return this.httpClient.get(BACK_END_URL+"/ReportingSourceur/mapTechnologieParSourceur");
  }
  rechercheReportingSourceur(sourceur,dateDebut,datFin): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/ReportingSourceur/RechercheReportingSourceur?dateDebut="+dateDebut.getTime()+"&dateFin="+datFin.getTime() ,sourceur, httpOptions);
  }

  recherchemapTechnologieParSourceur (sourceur,dateDebut,datFin) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/ReportingSourceur/RecherchemapTechnologieParSourceur?dateDebut="+dateDebut.getTime()+"&dateFin="+datFin.getTime() , sourceur, httpOptions);
  }
  
}
