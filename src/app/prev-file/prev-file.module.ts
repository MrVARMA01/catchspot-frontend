import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrevFilePageRoutingModule } from './prev-file-routing.module';

import { PrevFilePage } from './prev-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrevFilePageRoutingModule
  ],
  declarations: [PrevFilePage]
})
export class PrevFilePageModule {}
