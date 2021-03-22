import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaireDepotPageRoutingModule } from './faire-depot-routing.module';

import { FaireDepotPage } from './faire-depot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaireDepotPageRoutingModule
  ],
  declarations: [FaireDepotPage]
})
export class FaireDepotPageModule {}
