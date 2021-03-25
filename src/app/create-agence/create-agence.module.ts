import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAgencePageRoutingModule } from './create-agence-routing.module';

import { CreateAgencePage } from './create-agence.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAgencePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CreateAgencePage]
})
export class CreateAgencePageModule {}
