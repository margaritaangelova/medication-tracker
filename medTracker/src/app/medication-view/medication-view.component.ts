import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {
  categories: any[];
  medications: any[];

  selectedCategoryID: string;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.medicationService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  onCategoryClick(){
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCategoryID = params.categoryId;

        this.medicationService.getMedications(this.selectedCategoryID).subscribe((medications: any) => {
          this.medications = medications;
          
        });
      }


    )
  }

}
