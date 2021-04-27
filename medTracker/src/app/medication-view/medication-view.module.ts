import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationViewComponent } from './medication-view.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [MedicationViewComponent],
  exports: [MedicationViewComponent]
})
export class MedicationViewComponentModule {}
