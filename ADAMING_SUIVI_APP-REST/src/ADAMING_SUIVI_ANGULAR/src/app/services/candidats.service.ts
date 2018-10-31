import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../helper/application.constant';
import { UtilisateurService } from './utilisateur.service';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { TOKEN_NAME } from '../helper/auth.constant';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Entretien } from '../models/Entretien';
import { Motif } from '../models/Motif';
import { Candidate } from '../models/Candidate';
import { HelperService } from '../helper/helper.service';
import { Suivi } from '../models/Suivi';

@Injectable({
  providedIn: 'root'
})
export class CandidatsService {


  constructor(private httpClient: HttpClient, private helperService: HelperService,
    private utilisateurService: UtilisateurService, private http: Http) {
  }
  folders = []
  create(candidate: Candidate, mime): Observable<any> {
    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/ajoutCandidat?mime=" + mime + "&login=" + this.utilisateurService.getConnetedUserInfo().login, candidate, httpOptions).pipe(map(async (data: any) => {
      if (data != null) {
        data.dateInscription = new Date(data.dateInscription)
        data.dateNaissance = new Date(data.dateNaissance)
        data.dateObtentionDiplome = new Date(data.dateObtentionDiplome)
        if (data.entretien == undefined || data.entretien == null)
          data.entretien = new Entretien();
        else
          data.entretien.date = new Date(data.entretien.date);
        if (data.motif == undefined || data.motif == null)
          data.motif = new Motif();
      }
      return data;
    }));
  }
  updateCandidat(candidate: Candidate): Observable<any> {

    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.put(BACK_END_URL + "/updateCandidat", candidate, httpOptions).pipe(map(async (data: any) => {
      if (data != null) {
        data.dateInscription = new Date(data.dateInscription)
        data.dateNaissance = new Date(data.dateNaissance)
        data.dateObtentionDiplome = new Date(data.dateObtentionDiplome)
        if (data.entretien == undefined || data.entretien == null)
          data.entretien = new Entretien();
        else
          data.entretien.date = new Date(data.entretien.date);
        if (data.motif == undefined || data.motif == null)
          data.motif = new Motif();
      }
      return data;
    }))

  }
  rechercheNouveauxcandidats(candidate, page, size): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/rechercheNouveauxcandidats" + "?page=" + page + "&size=" + size, candidate, httpOptions);
  }


  uploadWordFile(fileBase): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post(BACK_END_URL + "/convertWordToPdf", fileBase, httpOptions);
  }
  getCandidatByEmail(email: String): Observable<Promise<Candidate>> {
    return this.httpClient.get<Candidate>(BACK_END_URL + "/getCandidatByEmail/" + email + "/").pipe(map(async (data: Candidate) => {
      if (data != null) {
        data.dateInscription = new Date(data.dateInscription)
        data.dateNaissance = new Date(data.dateNaissance)
        data.dateObtentionDiplome = new Date(data.dateObtentionDiplome)
        if (data.entretien == undefined || data.entretien == null)
          data.entretien = new Entretien();
        else
          data.entretien.date = new Date(data.entretien.date);
        if (data.motif == undefined || data.motif == null)
          data.motif = new Motif();
      }
      return data;
    }))

  }
  getCandidatByNumTel(numTel: String): Observable<Candidate> {
    return this.httpClient.get<Candidate>(BACK_END_URL + "/getCandidatByNumTel/" + numTel)
  }

  getListNomCvs(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/getListNomCvs");
  }



  getNouveauxCandidats(page, size) {
    return this.httpClient.get<any>(BACK_END_URL + '/nouveauxcandidats/' + page + '/' + size);
  }

  MaxLength() {

    return this.httpClient.get<any>(BACK_END_URL + '/nberNouveauxCandidats');
  }

  getTousCandidats(page, size) {
    return this.httpClient.get<any>(BACK_END_URL + '/candidats/' + page + '/' + size);
  }

  rechercheTouscandidats(candidat, page, size): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheTouscandidats" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }
  getCandidatArelancer(page, size) {
    return this.httpClient.get<any>(BACK_END_URL + '/candidatsarelancer/' + page + '/' + size);
  }
  rechercheCandidatArelancer(candidat, page, size): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatsaRelancer" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }
  rechercheCandidatAvecEntretien(candidat, page, size): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatavecentretien" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }
  RechercheReporting(candidat, page, size): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/RechercheReporting" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }
  getCandidatEntretien(page, size) {
    return this.httpClient.get<any>(BACK_END_URL + '/candidatavecentretien/' + page + '/' + size);
  }
  getReportingCandidat(page, size) {
    return this.httpClient.get<any>(BACK_END_URL + '/reporting/' + page + '/' + size);
  }


  getCandidatById(id: number): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/getcandidatById/" + id).pipe(map(async (data: any) => {
      if (data != null) {
        data.dateInscription = new Date(data.dateInscription)
        data.dateNaissance = new Date(data.dateNaissance)
        data.dateObtentionDiplome = new Date(data.dateObtentionDiplome)

        if (data.suivi == undefined || data.suivi == null)
          data.suivi = new Suivi();
        if (data.entretien == undefined || data.entretien == null)
          data.entretien = new Entretien();
        else
          data.entretien.date = new Date(data.entretien.date);
        if (data.motif == undefined || data.motif == null)
          data.motif = new Motif();
      }
      return data;
    }))
  }

  getCvCandidats(candidat): Observable<any> {
    let token = localStorage.getItem(TOKEN_NAME);
    const headers = new Headers({ 'Authorization': `Bearer ${token}` });
    return this.http.post(BACK_END_URL + "/CVPDF", { id: candidat.id }, {
      headers: headers, responseType: ResponseContentType.Blob,
    }).map((res) => {
      return {
        filename: res.headers.get("content-disposition").split(';')[1],
        data: res.blob()
      };
    })
  }

  envoyerEmailHorsCibleCandidats(candidat, login, comMotif): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/envoyerEmailHorsCibleCandidats" + "?login=" + login + "&comMotif=" + comMotif, candidat)
  }

  envoyerEmailDisboCandidats(emailEntrtien, login): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/envoyerEmailDispoCandidats" + "?login=" + login, emailEntrtien);
  }

}
