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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
