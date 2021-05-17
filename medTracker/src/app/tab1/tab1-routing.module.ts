import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesWrapperComponent } from '../categories-wrapper/categories-wrapper.component';
import { Tab1PageModule } from './tab1.module';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '', 
    component: Tab1Page,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('../categories-wrapper/categories-wrapper.module').then( m => m.CategoriesWrapperComponentModule)
      }
    ]
  },
  // ]
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('../medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  // },
  // {
  //   path: 'new-category',
  //   loadChildren: () => import('../new-category/new-category.module').then( m => m.NewCategoryComponentModule)
  // },
  // {
  //   path: '/tabs/tab1',
  //   redirectTo: './categories',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'categories', 
  //   loadChildren: () => import('../categories-wrapper/categories-wrapper.module').then( m => m.CategoriesWrapperComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId', 
  //   loadChildren: () => import('../medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId/new-medication',
  //   loadChildren: () => import('../new-medication/new-medication.module').then( m => m.NewMedicationComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId/edit-category',
  //   loadChildren: () => import('../edit/edit-category/edit-category.module').then( m => m.EditCategoryComponentModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
