import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterComponent } from './register.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: RegisterComponent,
      }
    ])],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]
})
export class RegisterComponentModule {}