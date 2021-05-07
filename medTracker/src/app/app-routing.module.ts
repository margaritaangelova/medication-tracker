import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginComponentModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterComponentModule)
  },
  {
    path: 'new-category',
    loadChildren: () => import('./new-category/new-category.module').then( m => m.NewCategoryComponentModule)
  },
  // {
  //   path: 'categories/:categoryId', 
  //   loadChildren: () => import('./medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  // },
  // {
  //   path: 'categories/:categoryId/new-medication',
  //   loadChildren: () => import('./new-medication/new-medication.module').then( m => m.NewMedicationComponentModule)
  // },
  {
    path: 'categories/:categoryId/medications/:medicationId',
    loadChildren: () => import('./medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)
  },
  {
    path: 'categories/:categoryId/edit-category',
    loadChildren: () => import('./edit/edit-category/edit-category.module').then( m => m.EditCategoryComponentModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
