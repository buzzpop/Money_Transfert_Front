import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDepotPageRoutingModule } from './list-depot-routing.module';

import { ListDepotPage } from './list-depot.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListDepotPageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [ListDepotPage]
})
export class ListDepotPageModule {}
