import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubDetailsPageRoutingModule } from './sub-details-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubDetailsPage } from './sub-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubDetailsPageRoutingModule,
    FontAwesomeModule, 
  ],
  declarations: [SubDetailsPage]
})
export class SubDetailsPageModule {}
