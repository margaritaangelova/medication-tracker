import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewMedicationComponent } from './new-medication.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NewMedicationComponent,
      }
    ])],
  declarations: [NewMedicationComponent],
  exports: [NewMedicationComponent]
})
export class NewMedicationComponentModule {}