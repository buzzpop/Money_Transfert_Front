import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotUserPageRoutingModule } from './depot-user-routing.module';

import { DepotUserPage } from './depot-user.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DepotUserPageRoutingModule,
        NgxPaginationModule
    ],
  declarations: [DepotUserPage]
})
export class DepotUserPageModule {}
