import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import { Camera} from '@ionic-native/camera/ngx';

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

  public adminSystem = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Liste des Utilisateurs', url: '/list-users', icon: 'people' },
    { title: 'Creer Utilisateur', url: '/create-user', icon: 'person-add' },
    { title: 'Creer Agence', url: '/create-agence', icon: 'business' },
    { title: 'Liste des Agences', url: '/list-agence', icon: 'list' },
    { title: 'Creer Compte', url: '/create-account', icon: 'key' },
  ];
  caissier=[
    { title: 'Faire un dépot', url: '/faire-depot', icon: 'wallet' }
    ]
  user:any
  base64Image:any;
  role:any


  constructor(private authService: AuthenticationService,
              private camera: Camera) {}

  ngOnInit(){
    this.authService.user.subscribe(user=>{
      this.user= user
      if (user){
        this.role= this.user.roles.role
      }
    })
  }

  logOut() {
    this.authService.logOut();
  }

  takePictureFromCamera() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
    }).then((res)=>{

    }).catch(e=>{
      console.log(e);
    })
  }

  takePictureFromGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
    }).then((imageData)=>{
       this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }).catch(e=>{
      console.log(e);
    })
  }
}
