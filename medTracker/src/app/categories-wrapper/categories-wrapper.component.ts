import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicationService } from '../medication.service';
import { CategoryViewComponent } from './category-view/category-view.component';

@Component({
  selector: 'app-categories-wrapper',
  templateUrl: './categories-wrapper.component.html',
  styleUrls: ['./categories-wrapper.component.scss'],
})
export class CategoriesWrapperComponent implements OnInit, AfterViewInit {

  categoriesArray: any[];
  medicationsFromChild: any[];

  selectedCategoryID: string;
  
  //  @ViewChild('meds') medsRef: ElementRef;

  @ViewChild(CategoryViewComponent) private medicationsArr!: CategoryViewComponent;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    // this.medicationService.getCategories().subscribe((categories: any) => {
    //   this.categoriesArray = categories;
      
    // })
  }

  ngAfterViewInit(){
    // this.medicationsFromChild = this.medicationsArr.medications;

    // console.log(this.medicationsArr);

    // this.selectedCategoryID = this.categoryId.selectedCategoryID;
    // console.log(this.selectedCategoryID);
    
 
  
  }
  

}
