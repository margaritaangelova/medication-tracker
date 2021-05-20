import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, ParamMap } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {
  @Input() medications: any[];

  
  constructor(private medicationService: MedicationService, private route: ActivatedRoute) { }

  categoryId: string;

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.categoryId = params.get('categoryId');
        
        this.medicationService.getMedications(this.categoryId).subscribe((medications: any) => {
          this.medications = medications;
    
          
        });

      }
    )
  }

  onMedicationDeleteCick(id: string){
    this.medicationService.deleteMedication(this.categoryId, id).subscribe(() => {
      this.medications = this.medications.filter(val => val._id !== id);
    });
  }
  

}
