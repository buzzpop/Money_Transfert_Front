import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AgenceService} from '../services/agence.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  account:any

  constructor(private authService: AuthenticationService,
              private router: Router, private agenceService: AgenceService) { }

  ngOnInit() {

  this.agenceService.show_hidePassword();
  this.authService.getTokenOnStorage('decodeToken').then((token)=>{
    console.log(JSON.parse(token).id);
    this.agenceService.getuserSigned(JSON.parse(token).id).subscribe(res=>{
     this.account=res;
      console.log(this.account);
    })
  });
  }

  logOut() {
    this.authService.logOut()
    this.router.navigate(['/authentication'])
  }
}
