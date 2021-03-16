import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  depot(data){
   return  this.http.post(api_url +`admin/transactions/depot_client`,data)
  }

  retrait(data){
    return  this.http.put(api_url +`admin/transactions/retrait_client?`,data)
  }
}
