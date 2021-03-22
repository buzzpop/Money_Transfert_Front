import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAgencePage } from './list-agence.page';

const routes: Routes = [
  {
    path: '',
    component: ListAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAgencePageRoutingModule {}
