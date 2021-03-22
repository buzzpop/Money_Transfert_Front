import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  id_input='#show_hide_password ion-input';
  id_icon= '#show_hide_password ion-icon';

  constructor(private http: HttpClient) { }

 getSolde(id:number){
    return this.http.get(api_url +`admin/accounts/${id}`);
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

}
