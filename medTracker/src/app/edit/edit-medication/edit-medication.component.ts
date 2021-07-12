import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicationService } from 'src/app/medication.service';
import { Location } from '@angular/common';

import { io } from 'socket.io-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss'],
})
export class EditMedicationComponent implements OnInit {

  private socket: any;
  public data: any;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  constructor(private route: ActivatedRoute, private medicationService: MedicationService, private router: Router, private location: Location) {
    this.socket = io('http://localhost:3000');
    // this.socket = io('http://10.0.2.2:3000');
    // this.socket = io('http://blurpaper.com:9000');
   }

  medicationId: string;
  categoryId: string;
  medication: any;
  msg: object;

  ngOnInit(): void {

    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.medicationId = params.medicationId;
        this.categoryId = params.categoryId;


        this.subscription2 = this.medicationService.getMedication(this.categoryId, this.medicationId).subscribe((medication: any) => {
          this.medication = medication;
          
        })
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

    
    if(this.subscription3){
      this.subscription3.unsubscribe();
    }
  }

  updateMedication(title: string, intakeHour: number, intakeMinutes: number) {
    this.subscription3 = this.medicationService.updateMedication(this.categoryId, this.medicationId, title, intakeHour, intakeMinutes).subscribe(() => {
      //after clicking "Save", it navigates to the current category(with the given categoryId)
      this.router.navigate([ 'tabs/tab1/categories', this.categoryId]);

      this.medicationService.showNotification({ message:'Updated medication successfully!' });
    });
    
    this.msg = {hour: intakeHour, minutes: intakeMinutes, medicationName: title};

    this.socket.emit('medicationIntakeTime', this.msg);

  }

  goBack(){
    this.location.back();
  }

}
