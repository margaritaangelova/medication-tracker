import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCategoryComponent } from './new-category.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NewCategoryComponent],
  exports: [NewCategoryComponent]
})
export class NewCategoryComponentModule { }
