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

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        const categoryId: string = params.get('categoryId');
        
        this.medicationService.getMedications(categoryId).subscribe((medications: any) => {
          this.medications = medications;
    
          
        });

      }
    )
  }
  

}
