import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersAgencePageRoutingModule } from './users-agence-routing.module';

import { UsersAgencePage } from './users-agence.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UsersAgencePageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [UsersAgencePage]
})
export class UsersAgencePageModule {}
