import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class OriginesService {

  constructor(private httpClient: HttpClient) { }

  findAllOrigines(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/origine");
  }
}
