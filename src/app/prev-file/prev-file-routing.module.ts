import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrevFilePage } from './prev-file.page';

const routes: Routes = [
  {
    path: '',
    component: PrevFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrevFilePageRoutingModule {}
