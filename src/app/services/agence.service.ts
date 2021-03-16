import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient) { }

 getuserSigned(id:number){
    return this.http.get(api_url +`admin/accounts/${id}`);
 }

  show_hidePassword(){
    $(document).ready(() => {
      $('#show_hide_password a').on('click', (event:any) =>{
        event.preventDefault();
        if($('#show_hide_password ion-input').attr("type") == "text") {
          $('#show_hide_password ion-input').attr('type', 'hidden');
          $('#show_hide_password ion-icon').attr('name','eye-off');
        }
        else if($('#show_hide_password ion-input').attr("type") == "hidden"){
          $('#show_hide_password ion-input').attr('type', 'text');
          $('#show_hide_password ion-icon').attr('name','eye');

        }

      });
    });
  }

}
