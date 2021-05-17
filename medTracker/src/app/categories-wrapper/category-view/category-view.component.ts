import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicationService } from '../../medication.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
  selectedCategoryID: string;
  categoriesArray: any[] = [];
  medications: any[];

  // @Output() medicationsSubmit: EventEmitter<any> = new EventEmitter<any>();

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
    //   this.router.navigate([`./categories/${categoryId}`], {relativeTo: this.route});
    // }

    this.router.navigateByUrl(`tabs/tab1/categories/${categoryId}`);
    
    
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCategoryID = params.categoryId;
        
        this.medicationService.getMedications(this.selectedCategoryID).subscribe((medications: any) => {
          this.medications = medications;
          // this.medicationsSubmit.emit(this.medications);
          
        });

      }
    )
    
    
  }

  // onDeleteCategoryClick(){
  //   this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {
  //     console.log(this.selectedCategoryID);
      

  //     this.router.navigate([''])

  //   });
  // }

}
