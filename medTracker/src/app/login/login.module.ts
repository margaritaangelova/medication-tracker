import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      }
    ])],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginComponentModule {}