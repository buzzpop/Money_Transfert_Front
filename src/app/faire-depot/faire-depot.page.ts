import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgenceService} from '../services/agence.service';
import {AccountService} from '../services/account.service';
import {FunctionsService} from '../services/functions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faire-depot',
  templateUrl: './faire-depot.page.html',
  styleUrls: ['./faire-depot.page.scss'],
})
export class FaireDepotPage implements OnInit {

  depot: FormGroup;
  agencies=[];

  constructor(private formBuilder: FormBuilder, private agenceService: AgenceService,
              private accountS: AccountService,private functionS: FunctionsService,
              private router: Router) { }

  ngOnInit() {

    this.depot= this.formBuilder.group({
      amount:['',[Validators.required, Validators.pattern('[0-9]+$'), Validators.min(10000),]],
      idA:['', Validators.required]
    });

    this.agenceService.getAgency().subscribe(agencies=>{
      for (let ag of agencies['hydra:member']){
        this.agencies.push(ag)
      }
      console.log(this.agencies);
    })
  }

  onFormSubmit(value: FormGroup) {
    this.functionS.handleButtonClick().then(res=>{
      res.onDidDismiss().then(()=>{
        this.accountS.deposit(value).subscribe((response:any)=>{
          this.functionS.successPopup('Dépot Effectué',`Dépot d'une
          somme de ${this.depot.get('amount').value} Franc CFA a été effectué`)
        },error => {
          if (error.error=='impossible'){
            this.functionS.successPopup('Impossible',`Dépot impossible
        La somme du compe est superieur à 25000 Franc cfa`)
          }
        })

      })
    })

  }

}
