import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationViewComponent } from './medication-view.component';


const routes: Routes = [
  {
    path: '',
    component: MedicationViewComponent
  }
  // {
  //   path: 'new-medication',
  //   loadChildren: () => import('../new-medication/new-medication.module').then( m => m.NewMedicationComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId/edit-category',
  //   loadChildren: () => import('../edit/edit-category/edit-category.module').then( m => m.EditCategoryComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId/medications/:medicationId',
  //   loadChildren: () => import('../medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationViewRoutingModule {}