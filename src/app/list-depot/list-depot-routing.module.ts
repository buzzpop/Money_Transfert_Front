import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDepotPage } from './list-depot.page';

const routes: Routes = [
  {
    path: '',
    component: ListDepotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDepotPageRoutingModule {}
