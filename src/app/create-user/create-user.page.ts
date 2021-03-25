import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {AgenceService} from '../services/agence.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FunctionsService} from '../services/functions.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  createUserForm: FormGroup;
  profil = [];
  agency = [];
  user:any

  constructor(private formBuilder: FormBuilder,
              private userS: UserService,
              private agencyS: AgenceService,
              private router: Router,
              private functionS: FunctionsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')){
     const id= +this.route.snapshot.paramMap.get('id')
      this.userS.getUserById(id).subscribe(user=>{
        this.user=user;
        console.log(this.user);
        this.createUserForm.patchValue(this.user);
        this.createUserForm.get('profil').setValue(this.user.profil.id)
        this.createUserForm.controls.password.setErrors(null);

      })
    }

    this.userS.getProfil().subscribe(profils=>{
      for (let p of profils['hydra:member']){
        this.profil.push(p)
      }
    })
   this.createUserForm= this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      profil:['',Validators.required],
      agence:[''],
      phone:['',Validators.required],
      cni:['',Validators.required],
      address:['',Validators.required],
    });
  }

  submit() {


    if(this.createUserForm.valid){
      const formdata= new FormData();
      for (let key in this.createUserForm.value){
        console.log(key);
        formdata.append(key ,this.createUserForm.get(key).value);
      }
      if (!this.user){
        this.functionS.handleButtonClick().then(rs=>{
          rs.onDidDismiss().then(()=>{
            this.userS.postUser(formdata).subscribe(response=>{
              this.functionS.successPopup('Ajout User','Ajout Réussi');
              this.agency=[];
              this.createUserForm.reset()
              this.router.navigate(['/list-users'])
                })
          })
        })
      }else{
        this.functionS.handleButtonClick().then(rs=>{
          rs.onDidDismiss().then(()=>{
            this.userS.putUser(formdata,this.user.id).subscribe(response=>{
              this.functionS.successPopup('Modif User','Modification Réussi');
              this.agency=[];
              this.createUserForm.reset()
              this.router.navigate(['/list-users'])
            })
          })
        })
      }
    }

  }

  selectedProfil(value) {
    for (let p of this.profil){
      if (p.id==value.value && (p.libelle=="AdminAgence" || p.libelle=="UserAgence")){
        this.agencyS.getAgency().subscribe(res=>{
         for(let a of res['hydra:member']){
           this.agency.push(a)
         }
          this.createUserForm.get('agence').setValidators(Validators.required)
        })
      }else {
        this.agency=[];
        this.createUserForm.controls.agence.setErrors(null);
      }
    }
  }
}
