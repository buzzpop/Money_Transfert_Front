import { Component, OnInit } from '@angular/core';
import {IonSelect} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
   type= new BehaviorSubject<string>('depot');
  commissions:any
  total:number

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.type.subscribe(val=>{
      if (val=="depot"){

        this.http.get('http://localhost:8000/api/admin/transactions/commissions/depot').subscribe(
          response=>{

              this.commissions=response

            this.total=0
            for (let res of this.commissions){
              this.total += res.shippingTaxe;
            }
          }
        )

      }else {

        this.http.get('http://localhost:8000/api/admin/transactions/commissions/retrait').subscribe(
          response=>{
            this.commissions=response
            this.total=0
            for (let res of this.commissions){
              this.total += res.withdrawalTaxe;
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
