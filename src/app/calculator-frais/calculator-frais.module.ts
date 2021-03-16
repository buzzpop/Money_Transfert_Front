import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorFraisPageRoutingModule } from './calculator-frais-routing.module';

import { CalculatorFraisPage } from './calculator-frais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorFraisPageRoutingModule
  ],
  declarations: [CalculatorFraisPage]
})
export class CalculatorFraisPageModule {}
