import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-categories-wrapper',
  templateUrl: './categories-wrapper.component.html',
  styleUrls: ['./categories-wrapper.component.scss'],
})
export class CategoriesWrapperComponent implements OnInit {

  selectedCategoryID: string;
  categoriesArray: any[] = [];

  constructor(private medicationService: MedicationService) { }

  ngOnInit() {
    this.medicationService.getCategories().subscribe((categories: any) => {
      this.categoriesArray = categories;
      
    })
  }

  onCategoryClick(categoryId: string){

    // this.disabledCategoryId = categoryId;

    // to avoid repetition of "categories/:categoryId" in the URL after more than one click on a category name:
    // if(!this.router.url.includes(`/categories/${categoryId}`)){
    //   // debugger;
    //   this.router.navigate([`./categories/${categoryId}`], {relativeTo: this.route});
    // }

    // this.router.navigateByUrl(`tabs/tab1/categories/${categoryId}`);
    
    
    
  }

}
