import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriesWrapperComponent } from './categories-wrapper.component';
import { CategoriesWrapperRoutingModule } from './categories-wrapper-routing.module';


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule, CategoriesWrapperRoutingModule],
    declarations: [CategoriesWrapperComponent],
    exports: [CategoriesWrapperComponent]
})
export class CategoriesWrapperComponentModule { }