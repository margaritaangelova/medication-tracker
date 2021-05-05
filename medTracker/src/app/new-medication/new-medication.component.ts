import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-medication',
  templateUrl: './new-medication.component.html',
  styleUrls: ['./new-medication.component.scss'],
})
export class NewMedicationComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {}

  goBack(){
    this.location.back();
  }
}
