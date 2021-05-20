import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Category } from 'src/app/models/category.model';
import { Medication } from 'src/app/models/medication.model';
import { MedicationService } from '../../medication.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {
  selectedCategoryID: string;
  categoriesArray: Category[] = [];
  medications: Medication[];

  @Output() medicationsEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.medicationService.getCategories().subscribe((categories: any) => {
      this.categoriesArray = categories;
      
    })
  }

  onCategoryClick(categoryId: string){

    //adding the categoryId to the path:
    this.router.navigateByUrl(`tabs/tab1/categories/${categoryId}`);

    this.selectedCategoryID = categoryId;
    
    
    //getting the medications for the selected category:
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.selectedCategoryID = params.categoryId;
        
    //     this.medicationService.getMedications(this.selectedCategoryID).subscribe((medications: any) => {
    //       this.medications = medications;
    //       // console.log(this.medications);
          
    //       this.medicationsEmitter.emit(this.medications);
          
    //     });

    //   }
    // )
    
    
  }

  // onDeleteCategoryClick(){
  //   this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {
  //     console.log(this.selectedCategoryID);
      

  //     this.router.navigate([''])

  //   });
  // }

  onCategoryClicked(medications){
    // this.medicationsFromChild = medications;
    // console.log(this.medicationsFromChild);

    // console.log(this.medsRef);

    // this.medicationsFromChild = this.medicationsArr.medications;
    // console.log(this.medicationsFromChild);
    
  }

  onDeleteCategoryClick(){
    console.log(this.selectedCategoryID);
    this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {

      this.router.navigate(['tabs/tab1/categories/:categoryId'])

    });
  }

}
