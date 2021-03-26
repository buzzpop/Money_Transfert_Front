import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListComptePageRoutingModule } from './list-compte-routing.module';

import { ListComptePage } from './list-compte.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListComptePageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [ListComptePage]
})
export class ListComptePageModule {}
