import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAgencePage } from './create-agence.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAgencePageRoutingModule {}
