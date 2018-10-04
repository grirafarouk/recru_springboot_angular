import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class MotifService {

  constructor(private httpClient:HttpClient) { }

  
  findAllMotifs(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/motifs");
  }

}
