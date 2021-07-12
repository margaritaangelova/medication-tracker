import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit, OnDestroy {

  historyElements: any[];
  subscription: Subscription;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.medicationService.getHistory().subscribe((history: any) => {
      this.historyElements = history;
      
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    
  }


}
