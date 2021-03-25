import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private loadingController: LoadingController,
              private alertCtrl: AlertController) { }

  async  handleButtonClick() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });

    await loading.present();
    return loading
  }

  async successPopup(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header ,
      cssClass:'my-custom-class',
      message:message,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      },]
    });

    await alert.present();
  }

}
