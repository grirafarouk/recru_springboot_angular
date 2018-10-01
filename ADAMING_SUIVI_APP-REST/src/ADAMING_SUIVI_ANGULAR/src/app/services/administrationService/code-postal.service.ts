import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class CodePostalService {

  constructor(private httpClient:HttpClient) { }

  
  findAllCodePostals(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/codePostal");
  }

  completeCodePostal(query): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/codePostal/recherche/"+query);
  }
}
