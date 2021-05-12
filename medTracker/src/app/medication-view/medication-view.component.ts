import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {
  categoriesArray: any[];
  medications: any[];

  selectedCategoryID: string;

  // disabledCategoryId: any = {};

  // cachedRelativeRoute: ActivatedRoute;
  // regexString: RegExp = /tabs\/tab1\/(categories)\/(\d+\w+)\/\1\/\2/;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router) { }

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
    
    
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCategoryID = params.categoryId;
        
        this.medicationService.getMedications(this.selectedCategoryID).subscribe((medications: any) => {
          this.medications = medications;
          
        });

      }
    )
  }

  onDeleteCategoryClick(){
    this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {

      this.router.navigate([''])

    });
  }

}
