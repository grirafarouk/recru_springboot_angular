import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACK_END_URL } from '../../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private httpClient:HttpClient) { }

  
  findAllRegion(): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/region");
  }

  completeRegion(query): Observable<any> {
    return this.httpClient.get(BACK_END_URL + "/region/recherche/"+query);
  }


  update(region): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(BACK_END_URL + "/region/update" , region, httpOptions);
}
}
