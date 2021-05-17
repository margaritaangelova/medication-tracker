import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesWrapperComponent } from './categories-wrapper.component';
import { CategoriesWrapperRoutingModule } from './categories-wrapper-routing.module';
import { MedicationViewComponent } from './category-view/medication-view/medication-view.component';


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule, CategoriesWrapperRoutingModule],
    declarations: [CategoriesWrapperComponent, MedicationViewComponent],
    exports: [CategoriesWrapperComponent, MedicationViewComponent]
})
export class CategoriesWrapperComponentModule { }