import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Transactions', url: '/transaction', icon: 'wallet' },
    { title: 'Comissions', url: '/commission', icon: 'cash' },
    { title: 'Calculateur', url: '/calculateur', icon: 'calculator' },
  ];
  user:any


  constructor(private authService: AuthenticationService) {}

  ngOnInit(){
    this.authService.user.subscribe(user=>{
      this.user= user
      console.log(user);
    })
  }

  logOut() {
    this.authService.logOut();
  }

  takePicture() {

  }
}
