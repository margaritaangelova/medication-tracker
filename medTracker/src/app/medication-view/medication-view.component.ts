import { Component, OnInit } from '@angular/core';
import { MedicationService } from 'src/app/medication.service';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {

  constructor(private medicationService: MedicationService) { }

  ngOnInit() {}

  createNewCategory(){
    debugger
    this.medicationService.createCategory('Testing..').subscribe((response: any) => {
      console.log(response);
      
    });
  }
}
