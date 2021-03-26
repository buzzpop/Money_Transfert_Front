import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.page.html',
  styleUrls: ['./list-compte.page.scss','../list-users/list-users.page.scss'],
})
export class ListComptePage implements OnInit {

  p=1;
  listCompte=[];

  constructor(private accountS: AccountService) { }

  ngOnInit() {
    this.accountS.getAccount().subscribe(response=>{
      for (let a of response['hydra:member']){
        this.listCompte.push(a)
      }
    })
  }

}
