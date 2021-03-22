import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaireDepotPage } from './faire-depot.page';

const routes: Routes = [
  {
    path: '',
    component: FaireDepotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaireDepotPageRoutingModule {}
