import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss'],
})
export class EditMedicationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private medicationService: MedicationService, private router: Router, private location: Location) { }

  medicationId: string;
  categoryId: string;
  medication: any;

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.medicationId = params.medicationId;
        this.categoryId = params.categoryId;


        this.medicationService.getMedication(this.categoryId, this.medicationId).subscribe((medication: any) => {
          this.medication = medication;
          
        })
      }
    )

  
  }
  
  updateMedication(title: string, frequency: number, intakeTime: number) {
    this.medicationService.updateMedication(this.categoryId, this.medicationId, title, frequency, intakeTime).subscribe(() => {
      //after clicking "Save", it navigates to the current category(with the given categoryId)
      // this.router.navigate(['/categories', this.categoryId]);
      this.router.navigate([ 'tabs/tab1/categories', this.categoryId]);
    });

  }

  goBack(){
    this.location.back();
  }

}
