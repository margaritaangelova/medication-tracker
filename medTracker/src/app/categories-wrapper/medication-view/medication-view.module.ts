import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicationViewComponent } from './medication-view.component';
import { MedicationViewRoutingModule } from './medication-view-routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, MedicationViewRoutingModule],
  declarations: [MedicationViewComponent],
  exports: [MedicationViewComponent]
})
export class MedicationViewComponentModule {}
