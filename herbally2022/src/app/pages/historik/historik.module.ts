import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorikPageRoutingModule } from './historik-routing.module';

import { HistorikPage } from './historik.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorikPageRoutingModule
  ],
  declarations: [HistorikPage]
})
export class HistorikPageModule {}
