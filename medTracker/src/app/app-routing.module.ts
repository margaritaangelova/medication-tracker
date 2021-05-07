import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MedicationViewComponent } from './medication-view/medication-view.component';
import { MedicationViewComponentModule } from './medication-view/medication-view.module';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewMedicationComponent } from './new-medication/new-medication.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'new-category', component: NewCategoryComponent
  },
  {
    path: 'categories/:categoryId/new-medication', component: NewMedicationComponent
  },
  // {path: 'categories', component: MedicationViewComponent},
  {path: 'categories/:categoryId', loadChildren: () => import('./medication-view/medication-view.module').then( m => m.MedicationViewComponentModule)},
  {path: 'categories/:categoryId/medications/:medicationId', component: MedicationViewComponentModule},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
