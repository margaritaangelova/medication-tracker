import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryViewComponent } from './category-view.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryViewComponent,
   
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryViewRoutingModule {}