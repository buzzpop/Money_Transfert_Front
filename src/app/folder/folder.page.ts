import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {AgenceService} from '../services/agence.service';
import {TransactionsService} from '../services/transactions.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  account:any
  accountId: number
  user:any
  role:string

  constructor(private authService: AuthenticationService,
              private router: Router, private agenceService: AgenceService,
              private transactionS: TransactionsService) { }

  ngOnInit() {
    this.authService.getTokenOnStorage('decodeToken').then( (token)=>{
      this.role=JSON.parse(token).roles.role
      console.log(this.role);
      this.accountId = JSON.parse(token).id;
      if (this.accountId)
      this.getSolde(this.accountId);

      this.authService.connectedUser(JSON.parse(token).idUser).subscribe(response=>{
        if (response){
          this.authService.user.next(response)
          this.user=response
        }

      })
    });


  this.transactionS.__refreshSolde.subscribe(()=>{

      this.getSolde(this.accountId)

    }
  )
  this.agenceService.show_hidePassword();

  }
  private getSolde(id:number){
    this.agenceService.getSolde(id).subscribe(res=>{
      this.account=res;
    })
  }

  logOut() {
    this.authService.logOut()
    this.router.navigate(['/authentication'])
  }
}
