import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepotUserPage } from './depot-user.page';

const routes: Routes = [
  {
    path: '',
    component: DepotUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotUserPageRoutingModule {}
