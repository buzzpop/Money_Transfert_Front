import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculateurPageRoutingModule } from './calculateur-routing.module';

import { CalculateurPage } from './calculateur.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalculateurPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CalculateurPage]
})
export class CalculateurPageModule {}
