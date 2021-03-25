import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersAgencePage } from './users-agence.page';

const routes: Routes = [
  {
    path: '',
    component: UsersAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersAgencePageRoutingModule {}
