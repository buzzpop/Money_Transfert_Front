import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-list-depot',
  templateUrl: './list-depot.page.html',
  styleUrls: ['./list-depot.page.scss', '../list-users/list-users.page.scss'],
})
export class ListDepotPage implements OnInit {
  depots=[];
  p=1;

  constructor(private accountS: AccountService) { }

  ngOnInit() {
    this.accountS.__refreshList.subscribe(()=>{
      this.getDepot();
    })
    this.getDepot()
  }
  getDepot(){
    this.depots=[]
    this.accountS.getdeposit().subscribe(response=>{
      console.log(response);
      for (let d of response['hydra:member']){
        this.depots.push(d)
      }
    })
  }
}
