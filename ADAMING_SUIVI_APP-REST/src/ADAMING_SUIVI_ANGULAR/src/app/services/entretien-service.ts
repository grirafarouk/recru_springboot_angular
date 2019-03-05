import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  constructor(private httpClient:HttpClient) { }
  protected prepareHeader(): object {
    const headers = new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin' : '*'
      });

    return {
        headers: headers
    };
  }
  
 public searchDisponibleById(id): any {
    return this.httpClient.get(BACK_END_URL + "/entretien/" + id);
  }

	public createOrUpdate(entity) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
		return this.httpClient.post(BACK_END_URL+"/entretien",entity,httpOptions)
  }
  
	public createDisponible(entity) {
    const httpOptions = this.prepareHeader();
		return this.httpClient.post(BACK_END_URL+"/entretien/disponible/",entity,httpOptions)
  }
  
}
