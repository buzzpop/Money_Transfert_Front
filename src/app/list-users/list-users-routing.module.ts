import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUsersPage } from './list-users.page';
import {CreateUserPage} from '../create-user/create-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListUsersPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListUsersPageRoutingModule {}
