import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AgenceService} from '../services/agence.service';
import {ActivatedRoute} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {FunctionsService} from '../services/functions.service';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.page.html',
  styleUrls: ['./list-agence.page.scss','../list-users/list-users.page.scss'],
})
export class ListAgencePage implements OnInit {
  agencies=[];

  constructor(private agenceS:AgenceService,private alertCtrl:AlertController,
              private functionS: FunctionsService) { }

  ngOnInit() {

    this.agenceS.__refreshList.subscribe(()=>{
      this.getAgency();
    })
   this.getAgency();
  }

  getAgency(){
    this.agencies=[];
    this.agenceS.getAgency().subscribe(response=>{
      for (let a of response['hydra:member']){
        this.agencies.push(a)
        console.log(this.agencies);
      }
    })
  }

}
