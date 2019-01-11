import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class MotifService {

  constructor(private httpClient: HttpClient) { }


  findAllMotifs(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/motifs");
  }
  findMotifHSByLibelle(libelle: String): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/motifs/libelle/" + libelle)
  }
  save(motif): Observable<any> {
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/motifs/add", motif, httpOptions);
  }

  update(motif): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/motifs/update", motif, httpOptions);
  }

  delete(motif): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/motifs/" + motif.id);
  }
}
