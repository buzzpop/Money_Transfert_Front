import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as $ from 'jquery';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

const api_url= environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  id_input='#show_hide_password ion-input';
  id_icon= '#show_hide_password ion-icon';

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  refreshlist = new Subject<void>()

  get __refreshList(){
    return this.refreshlist
  }

 deposit(data:any){
    return this.http.post(api_url +`admin/deposits`,data)
      .pipe(
        tap(()=>{
          this.refreshlist.next()
        })
      )
 }

  getdeposit() {
    return this.http.get(api_url + `admin/deposits?cancelled=false`)
  }

  getAccount() {
    return this.http.get(api_url + `admin/accounts`)
  }

  getLastDeposit() {
    return this.http.get(api_url + `admin/lastdepot`)
  }

  getdepositByUser(id:number){
    return this.http.get(api_url +`admin/users/${id}/depots?cancelled=false`)
  }

  cancelLastDepot(id:number){
    return this.http.put(api_url +`admin/depot/${id}/canceled`,'')
  }

  async confirmPopup(id:number,header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header ,
      cssClass:'my-custom-class',
      message:message,
      buttons: [{
        text: 'Non',
        handler: () => {
        }
      },{
        text: 'Oui',
        handler: () => {
          this.cancelLastDepot(id).subscribe(()=>{
            this.finalPopup('Terminé','Le dernier dépot a été annulé')
          })
        }
      },]
    });

    await alert.present();
  }

  async finalPopup(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header ,
      cssClass:'my-custom-class',
      message:message,
      buttons: [,{
        text: 'Ok',
        handler: () => {

        }
      },]
    });

    await alert.present();
  }
}
