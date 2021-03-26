import { Component, OnInit } from '@angular/core';
import {AgenceService} from '../services/agence.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {FunctionsService} from '../services/functions.service';

@Component({
  selector: 'app-users-agence',
  templateUrl: './users-agence.page.html',
  styleUrls: ['./users-agence.page.scss','../list-users/list-users.page.scss'],
})
export class UsersAgencePage implements OnInit {
  usersAgency=[]
  id:number;
  agencyName:string
  idAccount
  p=1;

  constructor(private agenceS: AgenceService,
              private route:ActivatedRoute,
              private alertCtrl: AlertController,
              private functionS: FunctionsService) { }

  ngOnInit() {
    this.id= +this.route.snapshot.paramMap.get('id')
    this.getusersAgency(this.id)
    this.agenceS.__refreshList.subscribe(()=>{
      this.getusersAgency(this.id)
    })
  }

  getusersAgency(id:number){
    this.usersAgency=[];
    this.agenceS.getUsersAgency(id).subscribe(response=>{
      for (let a of response['hydra:member']){
        if (this.agencyName==null){
          this.agencyName=a.agency.agencyName;
          this.idAccount=a.agency.account.accountNumber;
        }
        this.usersAgency.push(a)
      }
      console.log(this.usersAgency);
    })
  }

  delete(idU:number) {
    this.confirm('Suppression',
      'Voulez vous supprimer l\'utilisateur dans l\'agence?',this.id,idU)
  }

  async confirm(header:string, message:string, id:number, idU) {
    const alert = await this.alertCtrl.create({
      header:header ,
      cssClass:'my-custom-class',
      message:message,
      buttons: [{
        text: 'Annuler',
        handler: () => {
        }
      },
        {
          text: 'OK',
          handler: () => {
            this.functionS.handleButtonClick().then(res=>{
              res.onDidDismiss().then(()=>{
                this.agenceS.deleteuserAgency(id, idU).subscribe(res=>{
                  this.functionS.successPopup('Suppression','Suppression Réussie')
                  console.log(res);
                })
              })
            })

          }
        },]
    });

    await alert.present();
  }
}
