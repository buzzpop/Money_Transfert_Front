import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDepotPageRoutingModule } from './list-depot-routing.module';

import { ListDepotPage } from './list-depot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDepotPageRoutingModule
  ],
  declarations: [ListDepotPage]
})
export class ListDepotPageModule {}
