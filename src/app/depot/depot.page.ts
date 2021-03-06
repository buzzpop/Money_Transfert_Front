import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { AlertController, ToastController} from '@ionic/angular';
import {TransactionsService} from '../services/transactions.service';
import {Router} from '@angular/router';
import {FunctionsService} from '../services/functions.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  segmentModel = "emetteur";
  depotForm: FormGroup;
  total: number;
  taxe: number;
  private pattern = '7[7|6|8|0|5][0-9]{7}$';

  private depot: any;

  constructor(private formBuilder: FormBuilder, private  http: HttpClient,
              private alertCtrl: AlertController, private transanction: TransactionsService,
              private toastController: ToastController, private router: Router,
              private functionService: FunctionsService) {
  }

  ngOnInit() {

    this.depotForm = this.formBuilder.group({
      "amount": ['', [Validators.required, Validators.min(1), Validators.max(5000000)]],
      "clientD": this.formBuilder.group({
        "firstname": ['', Validators.required],
        "lastname": ['', Validators.required],
        "phone": ['', [Validators.required, Validators.pattern(this.pattern)]],
        "cni": ['', [Validators.required, Validators.pattern('[0-9]{13}$')]],
      }),
      "clientR": this.formBuilder.group({
        "firstname": ['', Validators.required],
        "lastname": ['', Validators.required],
        "phone": ['', [Validators.required, Validators.pattern(this.pattern)]],
      })
    });


    this.depotForm.get("amount").valueChanges.subscribe((amount: number) => {
      if (Number(amount) && amount > 0 && amount <= 5000000) {
        this.total = amount
        this.http.get(`http://localhost:8000/api/user/${amount}/taxe`).subscribe((res: any) => {
          this.taxe = res.taxe
          this.total = amount + (res.taxe)
        })
      } else {
        this.total = 0;
        this.taxe = 0
      }
    });

  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmer',
      cssClass:'my-custom-class',
      message: `EMETTEUR : ${this.depotForm.get('clientD').get('firstname').value}
                         ${this.depotForm.get('clientD').get('lastname').value}<br> <br>
               TELEPHONE :  ${this.depotForm.get('clientD').get('phone').value} <br><br>
               N?? CNI :  ${this.depotForm.get('clientD').get('cni').value}  <br><br>
               MONTANT A ENVOYER :  ${this.depotForm.get('amount').value} Franc CFA <br><br>
               RECEPTEUR :  ${this.depotForm.get('clientR').get('firstname').value}
                           ${this.depotForm.get('clientR').get('lastname').value} <br><br>
               MONTANT A RECEVOIR :  ${this.depotForm.get('amount').value} Franc CFA `,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.cancellationConfirmation();
          }
        },
        {
          text: 'Envoyer',
          handler: () => {
            this.functionService.handleButtonClick().then(res=>{
              res.onDidDismiss().then(()=>{
                this.transanction.depot(this.depotForm.value).subscribe(response => {
                    this.depot = response;
                    this.messageAlert('success', 'd??pot effectu?? avec succ??s');
                  },
                  error => {
                    console.log(error);
                    if (error.error=="insufficient amount"){
                      this.messageAlert('warning', 'le solde du compte est inferieur au montant demand??');
                    }if (error.error=="low account"){
                      this.messageAlert('warning', ' le depot ne peut pas etre effectu?? car le solde du compte est inferieur ?? 5000');
                    }

                  })
              })
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async successPopup() {
    const alert = await this.alertCtrl.create({
      header: 'Transfert R??ussi',
      cssClass:'my-custom-class',
      message: `Vous avez envoy?? ${this.depot.amount} franc cfa ??
               ${this.depot.clientRetrait.firstname} ${this.depot.clientRetrait.lastname} le ${this.depot.depositDate}
      <br><br><br>
      CODE DE TRANSACTION <br>
      ${this.depot.transactionCode} `,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      },]
    });

    await alert.present();
  }

  async cancellationConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Etes vous sure de pouvoir annuler votre d??pot?',
      message: `les donn??es saisies seront perdues`,
      cssClass:'my-custom-class',
      buttons: [
        {
          text: 'Non',
          handler: () => {
           this.showAlert()
          }
        },
        {
        text: 'Oui',
        handler: () => {
          this.messageAlert('danger', 'd??pot annul??')
        }
      }]
    });

    await alert.present();
  }

  segmentValue() {
    this.segmentModel = "recepteur";
  }

  async messageAlert(color: string, message: string) {
    const toast = await this.toastController.create({
      color: color,
      duration: 1000,
      message: message,
      position: 'top'
    });
    await toast.present();
    if (color=="danger"){
      await toast.onDidDismiss().then(() =>{
        this.depotForm.reset()
        this.router.navigate(['/home'])
      })
    }if (color=="success") {
      await toast.onDidDismiss().then(() =>{
        this.depotForm.reset()
        this.router.navigate(['/home']);
        this.successPopup()
      })
    }

  }
}
