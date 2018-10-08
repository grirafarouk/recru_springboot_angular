import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class TypeFormationService {

  constructor(private http: HttpClient) { }
  
  findAllTypeFormation(): Observable<any> {
    return this.http.get(BACK_END_URL + "/typeformation");
  }
  
}

