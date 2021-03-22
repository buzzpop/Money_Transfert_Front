import { Injectable } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private loadingController: LoadingController) { }

  async  handleButtonClick() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });

    await loading.present();
    return loading
  }
}
