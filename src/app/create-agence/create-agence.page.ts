import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgenceService} from '../services/agence.service';
import {FunctionsService} from '../services/functions.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-agence',
  templateUrl: './create-agence.page.html',
  styleUrls: ['./create-agence.page.scss'],
})
export class CreateAgencePage implements OnInit {
  createAgence: FormGroup;
  agencebyId:any

  constructor(private formBuilder: FormBuilder,private agenceService:AgenceService,
              private funcS:FunctionsService,private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')){
      const id= +this.route.snapshot.paramMap.get('id')
      this.agenceService.getAgencyById(id).subscribe(agence=>{
        this.agencebyId=agence;
        console.log(this.agencebyId);
        this.createAgence.patchValue(this.agencebyId);
        this.createAgence.get('account').get('balance').setErrors(null)
      })
    }

    this.createAgence= this.formBuilder.group({
      agencyName:['',Validators.required],
      agencyAddress:['',Validators.required],
      account:this.formBuilder.group({
        accountNumber:['',Validators.required],
        balance:['',[Validators.required,Validators.min(700000)]]
      })
    });

    this.createAgence.get('agencyName').valueChanges.subscribe(res=>{
      if (!this.agencebyId){
        for (let i=0;i<res.length;i++){
          if (res.length==3){
            this.createAgence.get('account').get('accountNumber').setValue((this.createAgence.get('agencyName').value).toUpperCase()+this.numAccount())
          }else if(res.length<3) {
            this.createAgence.get('account').get('accountNumber').setValue(null)
          }
        }
      }else {
        if (res.length==3)
        this.createAgence.get('account').get('accountNumber')
          .setValue((this.createAgence.get('agencyName')
            .value).toUpperCase()+this.agencebyId.account.accountNumber.substr(3))

      }
    })
  }

  submit() {
    this.funcS.handleButtonClick().then(res=>{
      res.onDidDismiss().then(()=>{
        if (!this.agencebyId){
          this.agenceService.postAgency(this.createAgence.value).subscribe(res=>{
            this.funcS.successPopup('Ajout','Création de l\'agence réussie')
            this.router.navigate(['/list-agence'])
          })
        }else {
          this.agenceService.putAgency(this.createAgence.value,this.agencebyId.id).subscribe(res=>{
            this.funcS.successPopup('Modification','Modification de l\'agence réussie')
            this.router.navigate(['/list-agence'])
          })
        }
      })
    })

  }

  numAccount(min=1, max=10) {
    let num = ""
    for (let i=0;i<6;i++){
      num+=Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
  }
}
