import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MedicationService } from '../medication.service';
import { Medication } from '../models/medication.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-medication',
  templateUrl: './new-medication.component.html',
  styleUrls: ['./new-medication.component.scss'],
})
export class NewMedicationComponent implements OnInit {

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router,  private location: Location) { }

  categoryId: string;

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['categoryId'];
        
      }
    )
  }

  createMedication(title: string, frequency: number, intakeTime: number) {
    this.medicationService.createMedication(title, this.categoryId, frequency, intakeTime).subscribe((newMedication: Medication) => { 
      
      //we can use relative routing here (../):
      this.router.navigate(['../'], {relativeTo: this.route })
    });
  }

  goBack(){
    this.location.back();
  }
}
