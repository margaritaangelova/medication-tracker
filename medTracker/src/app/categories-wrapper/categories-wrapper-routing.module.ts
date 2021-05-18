import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationViewComponent } from './medication-view/medication-view.component';
import { CategoriesWrapperComponent } from './categories-wrapper.component';


const routes: Routes = [
  {
    path: '', 
    component: CategoriesWrapperComponent,
    children: [
        {
            path: ':categoryId',
            loadChildren: () => import('./category-view/category-view.module').then( m => m.CategoryViewComponentModule)  
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesWrapperRoutingModule {}