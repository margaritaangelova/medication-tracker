import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryViewComponent } from './category-view.component';
import { CategoryViewRoutingModule } from './category-view-routing.module';
import { MedicationViewComponentModule } from '../medication-view/medication-view.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, CategoryViewRoutingModule, MedicationViewComponentModule],
  declarations: [CategoryViewComponent],
  exports: [CategoryViewComponent]
})
export class CategoryViewComponentModule {}
