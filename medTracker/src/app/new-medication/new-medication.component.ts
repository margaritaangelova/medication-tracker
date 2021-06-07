import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MedicationService } from '../medication.service';
import { Medication } from '../models/medication.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { io } from 'socket.io-client';

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
   }

  categoryId: string;
  msg: object;

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['categoryId'];
        
      }
    )

    // var form = document.getElementById('form');
    // var input = document.getElementById('intake');

  //   form.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     if (input.value) {
  //         socket.emit('medicationIntakeTime', input.value);
  //         input.value = '';
  //     }
  // });

    this.socket.on('notification', data => {
      this.data = data;
    });
  }

  createMedication(title: string, intakeHour: number, intakeMinutes: number) {
    this.medicationService.createMedication(title, this.categoryId, intakeHour, intakeMinutes).subscribe((newMedication: Medication) => { 
      
      //we can use relative routing here (../):
      this.router.navigate([ 'tabs/tab1/categories', this.categoryId]);
    });

    this.msg = {hour: intakeHour, minutes: intakeMinutes};

    this.socket.emit('medicationIntakeTime', this.msg);
  }

  goBack(){
    this.location.back();
  }
}
