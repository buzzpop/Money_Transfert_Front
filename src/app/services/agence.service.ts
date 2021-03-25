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
export class AgenceService {

  id_input='#show_hide_password ion-input';
  id_icon= '#show_hide_password ion-icon';

  constructor(private http: HttpClient) { }

  getAgencyById(id:number){
    return this.http.get(api_url+`admin/agencies/${id}`)
  }

 getSolde(id:number){
    return this.http.get(api_url +`admin/accounts/${id}`);
 }
 getAgency(){
   return this.http.get(api_url +`admin/agencies?isArchived=false`,{headers:{'Content-Type':'application/json'}});
 }

  getUsersAgency(id:number){
    return this.http.get(api_url +`admin/agencies/${id}/users`,{headers:{'Content-Type':'application/json'}});
  }

  postAgency(data){
    return this.http.post(api_url +`admin/agencies`, data)
      .pipe(
        tap(()=>{
          this.refreshlist.next()
        })
      )
  }

    deleteuserAgency(id:number, idU:number){
   return  this.http.delete(api_url+`admin/agencies/${id}/users/${idU}`)
      .pipe(
        tap(()=>{
          this.refreshlist.next()
        })
      )

}
  putAgency(data:any,id:number){
    return this.http.put(api_url +`admin/agencies/${id}`, data)
      .pipe(
        tap(()=>{
          this.refreshlist.next()
        })
      )
  }

  show_hidePassword(){
    $(document).ready(() => {
      $('#show_hide_password a').on('click', (event:any) =>{
        event.preventDefault();
        if($(this.id_input).attr("type") == "text") {
          $(this.id_input).attr('type', 'hidden');
          $(this.id_icon).attr('name','eye-off');
        }
        else if($(this.id_input).attr("type") == "hidden"){
          $(this.id_input).attr('type', 'text');
          $(this.id_icon).attr('name','eye');

        }

      });
    });
  }

  refreshlist = new Subject<void>()

  get __refreshList(){
    return this.refreshlist
  }

}
