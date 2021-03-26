import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAgencePageRoutingModule } from './list-agence-routing.module';

import { ListAgencePage } from './list-agence.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListAgencePageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [ListAgencePage]
})
export class ListAgencePageModule {}
