import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../helper/application.constant';
import { UtilisateurService } from './utilisateur.service';
import { Candidate } from '../views/candidats/candidate';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';
import { TOKEN_NAME } from '../helper/auth.constant';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class CandidatsService {

  constructor(private httpClient: HttpClient,private utilisateurService:UtilisateurService,private http:Http) {
  }
  folders=[]
  createOrUpdate(candidate,mime): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/ajoutCandidat?mime="+mime+"&login="+this.utilisateurService.getConnetedUserInfo().login, candidate,httpOptions);
  }

  rechercheNouveauxcandidats(candidate): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheNouveauxcandidats", candidate,httpOptions);
  }


  uploadWordFile(fileBase): Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    }; 
    return this.httpClient.post(BACK_END_URL+"/convertWordToPdf",fileBase,httpOptions);
  }
  getCandidatByEmail(email:String):Observable<Candidate>{
    return this.httpClient.get<Candidate>(BACK_END_URL+"/getCandidatByEmail/"+email+"/")

  }
  getCandidatByNumTel(numTel:String):Observable<Candidate>{
    return this.httpClient.get<Candidate>(BACK_END_URL+"/getCandidatByNumTel/"+numTel)
  }

  getListNomCvs():Observable<any>{
   return this.httpClient.get(BACK_END_URL+"/getListNomCvs");
  }


 
  getNouveauxCandidats (page, size) {
    return this.httpClient.get<any>(BACK_END_URL+'/nouveauxcandidats/' + page + '/' + size);
  }

  MaxLength () {

    return this.httpClient.get<any>(BACK_END_URL+'/nberNouveauxCandidats');
  }

  getTousCandidats (page, size) {
    return this.httpClient.get<any>(BACK_END_URL+'/candidats/' + page + '/' + size);
  }

  rechercheTouscandidats(candidat): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheTouscandidats", candidat,httpOptions);
  }
  getCandidatArelancer (page, size) {
    return this.httpClient.get<any>(BACK_END_URL+'/candidatsarelancer/' + page + '/' + size);
  }
  rechercheCandidatArelancer(candidat): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatsaRelancer", candidat,httpOptions);
  }
  getCandidatEntretien (page, size) {
    return this.httpClient.get<any>(BACK_END_URL+'/candidatavecentretien/' + page + '/' + size);
  }
  getReportingCandidat (page, size) {
    return this.httpClient.get<any>(BACK_END_URL+'/reporting/' + page + '/' + size);
  }


  getCandidatById(id:number):Observable<Candidate>{
    return this.httpClient.get<Candidate>(BACK_END_URL+"/getcandidatById/"+id)
  }

  getCvCandidats(candidat):Observable<any>{
    let token = localStorage.getItem(TOKEN_NAME);

    const headers = new Headers({'Authorization': `Bearer ${token}`});
    const options = new RequestOptions({headers: headers});
   

    return this.http.post(BACK_END_URL+"/CVPDF",{id:candidat.id},{ headers: headers,     responseType: ResponseContentType.Blob,
    } ).map(res => {
      return {
        filename: candidat.nomCV,
        data: res.blob()
      };
    })
  }

}
