import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {
  @Input() medications: any[];
  
  constructor() { }

  ngOnInit() {
    
  }

}
