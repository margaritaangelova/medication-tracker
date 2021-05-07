import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  },
  {
    path: 'categories/:categoryId', 
    loadChildren: () => import('../medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  },
  {
    path: 'categories/:categoryId/new-medication',
    loadChildren: () => import('../new-medication/new-medication.module').then( m => m.NewMedicationComponentModule)
  },
  {
    path: 'categories/:categoryId/edit-category',
    loadChildren: () => import('../edit/edit-category/edit-category.module').then( m => m.EditCategoryComponentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
