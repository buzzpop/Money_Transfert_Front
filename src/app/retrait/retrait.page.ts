import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController, ToastController} from '@ionic/angular';
import {TransactionsService} from '../services/transactions.service';
import {Router} from '@angular/router';
import {log} from 'util';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss','../depot/depot.page.scss'],
})
export class RetraitPage implements OnInit {
  segmentModel= 'beneficiaire';
  retraitForm: FormGroup;
  clients:any
  retrait:any

  constructor(private formBuilder: FormBuilder, private  http: HttpClient,
              private alertCtrl: AlertController, private transanction: TransactionsService,
              private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.retraitForm = this.formBuilder.group({
      "transactionCode": ['', [Validators.required,  Validators.pattern('[0-9]{3}\-[0-9]{3}\-[0-9]{3}$')]],
      "cni": ['', [Validators.required, Validators.pattern('[0-9]{13}$')]],
    });


      this.retraitForm.get("transactionCode").valueChanges.subscribe((code: string) => {
        if ( this.retraitForm.get("transactionCode").valid){
          this.http.get(`http://localhost:8000/api/transaction/${code}/retrait/clients`).subscribe((res: any) => {
            this.clients=res;
          },error =>{
            if (error.status == 403)
            this.errorMessage('ERREUR','le code de transaction est invalide')})
        }else {
          this.clients=null;
        }
      });

  }


  async errorMessage(header: string,messge:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      cssClass:'my-custom-class',
      message: messge,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmer',
      cssClass:'my-custom-class',
      message: `BENEFICIAIRE : ${this.clients.clientRetrait.firstname}
                         ${this.clients.clientRetrait.lastname}<br> <br>
               TELEPHONE :  ${this.clients.clientRetrait.phone} <br><br>
               N° CNI :  ${this.retraitForm.get('cni').value}  <br><br>
               MONTANT REÇU :  ${this.clients.amount} Franc CFA <br><br>
               EMETTEUR :  ${this.clients.clientDepot.firstname}
                           ${this.clients.clientDepot.lastname} <br><br>
               TELEPHONE :  ${this.clients.clientDepot.phone}`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.messageAlert('danger', 'retrait annulé');
          }
        },
        {
          text: 'Retirer',
          handler: () => {
            this.transanction.retrait(this.retraitForm.value).subscribe(response => {
                this.retrait = response;
               this.messageAlert('success', 'retrait effectué avec succés');
              },
              error => {
              if (error.status== 403){
                this.errorMessage('Erreur', `le dépot d'un montant de ${this.clients.amount} Franc CFA envoyé par ${this.clients.clientDepot.firstname}
                 ${this.clients.clientDepot.lastname} a été déja retiré <br><br>
                 DATE DE RETRAIT: ${error.error}`);
                this.router.navigate(['/home'])
              }

              })
          }
        }
      ]
    });

    await alert.present();
  }

  async messageAlert(color: string, message: string) {
    const toast = await this.toastController.create({
      color: color,
      duration: 2000,
      message: message,
      position: 'top'
    });
    await toast.present();
    if (color=="danger"){
      await toast.onDidDismiss().then(() =>{
        this.router.navigate(['/home'])
      })
    }else {
      await toast.onDidDismiss().then(() =>{
        this.successPopup()
        this.retraitForm.reset()
        this.router.navigate(['/home']);
      })
    }

  }

  async successPopup() {
    console.log(this.retrait);
    const alert = await this.alertCtrl.create({
      header: 'Retrait Réussi',
      cssClass:'my-custom-class',
      message: `Vous venez de retiré les ${this.retrait.amount} franc cfa
             envoyé par  ${this.retrait.clientDepot.firstname} ${this.retrait.clientDepot.lastname}
      <br><br><br>
      CODE DE Retrait <br>
      ${this.retrait.transactionCode} `,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      },]
    });

    await alert.present();
  }


}
