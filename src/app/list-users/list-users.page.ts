import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FunctionsService} from '../services/functions.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {
  users =[]

  constructor(private userService: UserService,private functionS: FunctionsService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.userService.__refreshSolde.subscribe(()=>{
      this.listUsers();
    })
    this.listUsers();
  }

  listUsers(){
    this.users=[];
    this.userService.getUsers().subscribe(users=>{
      for (let u of users['hydra:member']){
        this.users.push(u)
      }
      console.log(users);
    })
  }

  delete(id:number) {
    this.confirm('Alert','Voulez vous Supprimer?',id)
  }

  async confirm(header:string, message:string, id:number) {
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
                this.userService.delete(id).subscribe(res=>{
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
