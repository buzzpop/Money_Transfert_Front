import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  id_input='#show_hide_password ion-input';
  id_icon= '#show_hide_password ion-icon';

  constructor(private http: HttpClient) { }

  refreshlist = new Subject<void>()

  get __refreshList(){
    return this.refreshlist
  }

 deposit(data:any){
    return this.http.post(api_url +`admin/deposits`,data);
 }

  getdeposit() {
    return this.http.get(api_url + `admin/deposits`)
      .pipe(
        tap(() => {
          this.refreshlist.next()
        })
      )
  }

  getdepositByUser(id:number){
    return this.http.get(api_url +`admin/users/${id}/depots`)
  }
}
