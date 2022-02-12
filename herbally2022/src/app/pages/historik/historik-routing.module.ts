import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorikPage } from './historik.page';

const routes: Routes = [
  {
    path: '',
    component: HistorikPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorikPageRoutingModule {}
