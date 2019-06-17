import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  findAllRole(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/role");
  }
  findRoleByLibelle(libelle: String): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/role/libelle/" + libelle)
  }
  findRoleById(id: number): Observable<any> {
    return this.httpClient.get<any>(BACK_END_URL + "/role/id/" + id)
  }

  searchingRoles(value):Observable<any>{

    return this.httpClient.get(BACK_END_URL + "/role/recherche/"+value );

  }

  save(typeformation): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/role/add", typeformation, httpOptions);
  }
  update(typeformation): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/role/update", typeformation, httpOptions);
  }

  delete(item): Observable<any> {
    return this.httpClient.delete(BACK_END_URL + "/role/" + item.id);
  }

}

