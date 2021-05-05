import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicationViewComponent } from './medication-view.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: MedicationViewComponent,
      }
    ])],
  declarations: [MedicationViewComponent],
  exports: [MedicationViewComponent]
})
export class MedicationViewComponentModule {}
