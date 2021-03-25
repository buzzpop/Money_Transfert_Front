import { Component, OnInit } from '@angular/core';
import {AccountService} from '../services/account.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-depot-user',
  templateUrl: './depot-user.page.html',
  styleUrls: ['./depot-user.page.scss','../list-users/list-users.page.scss'],
})
export class DepotUserPage implements OnInit {

  depotsUser=[];
  id:number
  user:string

  constructor(private accountS: AccountService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.id=+this.router.snapshot.paramMap.get('id')
    this.getDepotUsers(this.id)
  }
  getDepotUsers(id:number){
    this.depotsUser=[]
    this.accountS.getdepositByUser(id).subscribe(response=>{
      for (let d of response['hydra:member']){
        if (this.user==null){
          this.user= d.user.firstname
        }
        this.depotsUser.push(d)
      }
      console.log(this.depotsUser);
    })
  }

}
