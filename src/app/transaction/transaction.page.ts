import { Component, OnInit } from '@angular/core';
import {IonSelect} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss','../commission/commission.page.scss'],
})
export class TransactionPage implements OnInit {
  type= new BehaviorSubject<string>('depot');
  transactions:any
  total:number

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.type.subscribe(val=>{
      if (val=="depot"){

        this.http.get('http://localhost:8000/api/admin/transactions/user/depot').subscribe(
          response=>{
            this.transactions=response;
            this.total=0
            for (let res of this.transactions){
              this.total += res.amount;
            }
          }
        )
      }else {

        this.http.get('http://localhost:8000/api/admin/transactions/user/retrait').subscribe(
          response=>{
            this.transactions=response;
            this.total=0
            for (let res of this.transactions){
              this.total += res.amount;
            }
          }
        )
      }
    })
  }

  typeDepot(val: IonSelect) {
    this.type.next(val.value)
  }
}
