import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class TechnologieService {

  constructor(private http: HttpClient) { }
  getTechnologiesByLibelle () {
    return this.http.get<any>(BACK_END_URL+'/technologie/Libelle');
  }
  findAllTechnologies(): Observable<any> {
    return this.http.get(BACK_END_URL + "/technologie");
  }
  
}

