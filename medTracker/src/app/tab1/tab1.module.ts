import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MedicationViewComponentModule } from '../categories-wrapper/category-view/medication-view/medication-view.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ExploreContainerComponentModule,
 RouterModule
  ],
  declarations: [Tab1Page],
  exports: [
    Tab1Page
  ]
})
export class Tab1PageModule {}
