import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FunctionsService} from '../services/functions.service';

@Component({
  selector: 'app-calculateur',
  templateUrl: './calculateur.page.html',
  styleUrls: ['./calculateur.page.scss', '../depot/depot.page.scss'],
})
export class CalculateurPage implements OnInit {
  calculatorForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              private alertCtrl: AlertController, private functionS: FunctionsService) { }

  ngOnInit() {
    this.calculatorForm= this.formBuilder.group({
      amount:['',[Validators.required,Validators.min(1), Validators.pattern('[0-9]+$')]]
    })
  }

 async calculFrais() {
   let{frais}= <any> await this.http.get(`http://localhost:8000/api/calculfrais/${this.calculatorForm.get('amount').value}`).toPromise()
     this.functionS.handleButtonClick().then(res=>{
       res.onDidDismiss().then(()=>{
          this.successPopup(frais);
       })
     })
  }

  async successPopup(frais) {
    const alert = await this.alertCtrl.create({
      header: 'Calculateur',
      cssClass:'my-custom-class',
      message: `Pour une transaction de ${this.calculatorForm.get('amount').value} Franc cfa le frais
      est égal à ${frais} Franc CFA`,
      buttons: [{
        text: 'Retour',
        handler: () => {
        }
      },]
    });

    await alert.present();
  }
}
