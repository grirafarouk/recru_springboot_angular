import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../../helper/application.constant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportingSourceurService {

  constructor(private httpClient: HttpClient) { }


  findReportingSourceur(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/listeReporting");
  }
  findAllSourceur(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/listeReportingSourceur");
  }
  getChartTechnologies(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/mapTechnologieParSourceur");
  }
  // add by oussama
  getNbrCV(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/ReportingSourceur/nbrTotalCV");
  }
  // add by oussama
  getNbrTechnologie(): Observable<any> {
    return this.httpClient.get(BACK_END_URL+'/ReportingSourceur/nbrTotalTechnologie');
  }
  rechercheReportingSourceur(sourceur, dateDebut, datFin): Observable<any> {
    var url = "/ReportingSourceur/RechercheReportingSourceur";
    if (dateDebut != null && dateDebut != undefined) {
      url += "?dateDebut=" + dateDebut.getTime();
      if (datFin != null && datFin != undefined)
        url += "&dateFin=" + datFin.getTime();
    }
    else  if (datFin != null && datFin != undefined){
      url += "?dateFin=" + datFin.getTime();
    }
    return this.httpClient.post(BACK_END_URL + url, sourceur, httpOptions);
  }

  recherchemapTechnologieParSourceur(sourceur, dateDebut, datFin) {
    var url = "/ReportingSourceur/RecherchemapTechnologieParSourceur";
    if (dateDebut != null && dateDebut != undefined) {
      url += "?dateDebut=" + dateDebut.getTime();
      if (datFin != null && datFin != undefined)
        url += "&dateFin=" + datFin.getTime();
    }
    else  if (datFin != null && datFin != undefined){
      url += "?dateFin=" + datFin.getTime();
    }
    return this.httpClient.post(BACK_END_URL + url, sourceur, httpOptions);
  }

}
