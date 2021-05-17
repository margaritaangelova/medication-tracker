import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
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

  @ViewChild(CategoryViewComponent) medicationsArr;
  @ViewChild(CategoryViewComponent) categoryId;

  // disabledCategoryId: any = {};

  // cachedRelativeRoute: ActivatedRoute;
  // regexString: RegExp = /tabs\/tab1\/(categories)\/(\d+\w+)\/\1\/\2/;

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

  onCategoryClick(categoryId: string){

    // this.disabledCategoryId = categoryId;

    // to avoid repetition of "categories/:categoryId" in the URL after more than one click on a category name:
    // if(!this.router.url.includes(`/categories/${categoryId}`)){
    //   // debugger;
    //   this.router.navigate([`./categories/${categoryId}`], {relativeTo: this.route});
    // }

    // this.router.navigateByUrl(`tabs/tab1/categories/${categoryId}`);
    
    
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.selectedCategoryID = params.categoryId;
        
    //     this.medicationService.getMedications(this.selectedCategoryID).subscribe((medications: any) => {
    //       this.medications = medications;
          
    //     });

    //   }
    // )
  }

  onDeleteCategoryClick(){
    console.log(this.selectedCategoryID);
    this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {

      this.router.navigate([''])

    });
  }

}
