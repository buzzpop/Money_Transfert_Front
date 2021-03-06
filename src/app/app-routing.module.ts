import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentification/authentification.module').then( m => m.AuthentificationPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },

  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'calculateur',
    loadChildren: () => import('./calculateur/calculateur.module').then( m => m.CalculateurPageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./list-users/list-users.module').then( m => m.ListUsersPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'create-user/:id',
    loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'create-agence',
    loadChildren: () => import('./create-agence/create-agence.module').then( m => m.CreateAgencePageModule)
  },
  {
    path: 'create-agence/:id',
    loadChildren: () => import('./create-agence/create-agence.module').then( m => m.CreateAgencePageModule)
  },
  {
    path: 'list-agence',
    loadChildren: () => import('./list-agence/list-agence.module').then( m => m.ListAgencePageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'faire-depot',
    loadChildren: () => import('./faire-depot/faire-depot.module').then( m => m.FaireDepotPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'agence/:id/users-agence',
    loadChildren: () => import('./users-agence/users-agence.module').then( m => m.UsersAgencePageModule)
  },
  {
    path: 'list-depot',
    loadChildren: () => import('./list-depot/list-depot.module').then( m => m.ListDepotPageModule)
  },
  {
    path: 'depots/:id/user',
    loadChildren: () => import('./depot-user/depot-user.module').then( m => m.DepotUserPageModule)
  },
  {
    path: 'list-compte',
    loadChildren: () => import('./list-compte/list-compte.module').then( m => m.ListComptePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
