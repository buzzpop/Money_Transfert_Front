import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {
  authForm: FormGroup;
  errors: boolean= false;
  loading= false;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
              private router: Router) { }
  initForm(){
   this.authForm = this.formBuilder.group({
      username:['',[Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  show_hide_password(){
    $(document).ready(() => {
      $('#password ion-icon').on('click', (event:any) =>{

        if($('#password ion-input').attr("type") == "text") {
          $('#password ion-input').attr('type', 'password');
          $('#password ion-icon').attr('name','eye-off');
        }
        else if ($('#password ion-input').attr("type") == "password")  {
          $('#password ion-input').attr('type', 'text');
          $('#password ion-icon').attr('name','eye');
        }

      });
    });
  }

  ngOnInit() {
    this.show_hide_password();
    this.initForm()
    this.authService.authenticationState.subscribe(
      state=>{
       if (state){

         this.router.navigate(['/welcome'])
       }else {
         this.router.navigate(['/authentication'])
       }
      }
    )
  }

  onSubmit() {
    if (this.authForm.valid){
      this.loading=true
      this.authService.getToken(this.authForm.value).subscribe(
        token=>{
          this.authService.logIn(token['token']);
          this.loading=false
        },
        error=>{
          this.loading=false
          this.errors= true;
        }
      )
    }

  }


  clearmessageError() {
    this.errors=false;
  }

}
