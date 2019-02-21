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


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CandidatsService {
  destroyTempoFolder(loginuser): any {
    return this.httpClient.get(BACK_END_URL + "/destroyTempoFolder/" + loginuser);
  }


  constructor(private httpClient: HttpClient, private helperService: HelperService,
    private utilisateurService: UtilisateurService, private http: Http) {
  }
  folders = []

  public create(candidate: Candidate, mime): Observable<any> {
    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)

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

  public updateCandidat(candidate: Candidate): Observable<any> {

    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)

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
  public deletewordfile(fileBase):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    }; 

    return this.httpClient.post(BACK_END_URL + "/deletefile", fileBase, httpOptions);
  }


  public uploadWordFile(fileBase): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    }; 

    return this.httpClient.post(BACK_END_URL + "/convertWordToPdf", fileBase, httpOptions);
  }

  public updateficheCandidat(candidate: Candidate): Observable<any> {

    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)

    return this.httpClient.put(BACK_END_URL + "/updateficheCandidat", candidate, httpOptions).pipe(map(async (data: any) => {
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

  public getCandidatByEmail(email: String): Observable<Promise<Candidate>> {
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

  public updateficheEntretien(candidate: Candidate): Observable<any> {

    candidate.nom = this.helperService.getClearString(candidate.nom)
    candidate.prenom = this.helperService.getClearString(candidate.prenom)
    candidate.diplome = this.helperService.getClearString(candidate.diplome)

    return this.httpClient.put(BACK_END_URL + "/updateficheEntretien", candidate, httpOptions).pipe(map(async (data: any) => {
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


  searchCandidatByEmail(email): any {
    return this.httpClient.get(BACK_END_URL + "/getCandidatByEmail/" + email);
  }

  public getCandidatByNumTel(numTel: String): Observable<Candidate> {
    return this.httpClient.get<Candidate>(BACK_END_URL + "/getCandidatByNumTel/" + numTel)
  }

  public getListNomCvs(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/getListNomCvs");
  }


  public rechercheAjoutNouveauxcandidats(candidate, page, size): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/rechercheNouveauxcandidats" + "?page=" + page + "&size=" + size, candidate, httpOptions);
  }
//#region  List Candidats


  public rechercheNouveauxcandidats(candidate, page, size): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheNouveauxcandidats" + "?page=" + page + "&size=" + size, candidate, httpOptions);
  }

  public rechercheTouscandidats(candidat, page, size): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheTouscandidats" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }

  public rechercheTouscandidatsNbr(candidat): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheTouscandidatsNbr", candidat, httpOptions);
  }

  public rechercheNouveauxcandidatsNbr(candidat): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheNouveauxcandidatsNbr", candidat, httpOptions);
  }


  public rechercheCandidatArelancerNbr(candidat): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatARelancerNbr", candidat, httpOptions);
  }

  public rechercheCandidatArelancer(candidat, page, size): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatARelancer" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }

  public rechercheCandidatAvecEntretien(candidat, page, size, allValue): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatavecentretien" + "?page=" + page + "&size=" + size + "&allValue=" + allValue, candidat, httpOptions);
  }

  public rechercheCandidatAvecEntretienNbr(candidat, allValue): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheCandidatAvecEntretienNbr?allValue=" + allValue, candidat, httpOptions);
  }


  public rechercheReporting(candidat, page, size): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheReporting" + "?page=" + page + "&size=" + size, candidat, httpOptions);
  }

  public rechercheReportingNbr(candidat): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/RechercheReportingNbr", candidat, httpOptions);
  }


  //#endregion

  public getCandidatById(id: number): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/getcandidatById/" + id).pipe(map(async (data: any) => {
      if (data != null) {
        data.dateInscription = new Date(data.dateInscription)
        if(data.dateNaissance == null)
        data.dateNaissance=null
        else
        data.dateNaissance = new Date(data.dateNaissance)
        if(data.dateObtentionDiplome == null)
        data.dateObtentionDiplome=null
        else
        data.dateObtentionDiplome = new Date(data.dateObtentionDiplome)

        if (data.suivi == undefined || data.suivi == null)
          data.suivi = new Suivi();
        if (data.entretien == undefined || data.entretien == null)
          data.entretien = new Entretien();
        else if (data.entretien.date != null)
          data.entretien.date = new Date(data.entretien.date);
        else if (data.entretien.dateRelance != null)
          data.entretien.dateRelance = new Date(data.entretien.dateRelance);

        if (data.motif == undefined || data.motif == null)
          data.motif = new Motif();
      }
      return data;
    }))
  }

  public getCvCandidats(candidat): Observable<any> {
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

  public envoyerEmailHorsCibleCandidats(candidat, login, comMotif): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/envoyerEmailHorsCibleCandidats" + "?login=" + login + "&comMotif=" + comMotif, candidat)
  }

  public envoyerEmailDisboCandidats(emailEntrtien, login): Observable<any> {
    return this.httpClient.post(BACK_END_URL + "/envoyerEmailDispoCandidats" + "?login=" + login, emailEntrtien);
  }

}
