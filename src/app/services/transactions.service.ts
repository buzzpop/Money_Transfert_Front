import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  refreshSolde = new Subject<void>()

 get __refreshSolde(){
    return this.refreshSolde
 }

  depot(data){
   return  this.http.post(api_url +`admin/transactions/depot_client`,data)
     .pipe(
       tap(()=>{
         this.refreshSolde.next()
       })
     )
  }

  retrait(data){
    return  this.http.put(api_url +`admin/transactions/retrait_client?`,data)
      .pipe(
        tap(()=>{
          this.refreshSolde.next()
        })
      )
  }
}
