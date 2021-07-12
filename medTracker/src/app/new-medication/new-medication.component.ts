import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MedicationService } from '../medication.service';
import { Medication } from '../models/medication.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-medication',
  templateUrl: './new-medication.component.html',
  styleUrls: ['./new-medication.component.scss'],
})
export class NewMedicationComponent implements OnInit {
  private socket: any;
  public data: any;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router,  private location: Location) {
    this.socket = io('http://localhost:3000');
    // this.socket = io('http://10.0.2.2:3000');
    // this.socket = io('http://blurpaper.com:9000');
   }

  categoryId: string;
  msg: object;
  subscription: Subscription;
  subscription2: Subscription;

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['categoryId'];
        
      }
    )

    // this.socket.on('notification', data => {
    //   this.data = data;
    // });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

    
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }

  }

  createMedication(title: string, intakeHour: number, intakeMinutes: number) {
    this.subscription2 = this.medicationService.createMedication(title, this.categoryId, intakeHour, intakeMinutes).subscribe(() => { 
      
      //we can use relative routing here (../):
      this.router.navigate([ 'tabs/tab1/categories', this.categoryId]);
      
    });

    this.msg = {hour: intakeHour, minutes: intakeMinutes, medicationName: title};

    this.socket.emit('medicationIntakeTime', this.msg);
  }

  goBack(){
    this.location.back();
  }
}
