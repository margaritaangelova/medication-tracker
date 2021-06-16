import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {

  historyElements: any[];

  constructor(private medicationService: MedicationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.medicationService.getHistory().subscribe((history: any) => {
      this.historyElements = history;
      
    })
  }


}
