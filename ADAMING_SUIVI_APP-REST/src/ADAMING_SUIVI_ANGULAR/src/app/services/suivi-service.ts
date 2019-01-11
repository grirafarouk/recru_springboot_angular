import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_END_URL } from '../helper/application.constant';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {

  constructor(private httpClient:HttpClient) { }

	public createOrUpdate(entity) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
		return this.httpClient.post(BACK_END_URL+"/suivi",entity,httpOptions)
	}
}
