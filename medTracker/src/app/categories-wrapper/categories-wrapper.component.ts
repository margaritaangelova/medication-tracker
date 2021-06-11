import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicationService } from '../medication.service';
import { CategoryViewComponent } from './category-view/category-view.component';
import { io } from 'socket.io-client';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-categories-wrapper',
  templateUrl: './categories-wrapper.component.html',
  styleUrls: ['./categories-wrapper.component.scss'],
})
export class CategoriesWrapperComponent implements OnInit, AfterViewInit {

  categoriesArray: any[];
  medicationsFromChild: any[];

  private socket: any;

  selectedCategoryID: string;

  //  @ViewChild('meds') medsRef: ElementRef;

  @ViewChild(CategoryViewComponent) private medicationsArr!: CategoryViewComponent;

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router) {
    this.socket = io('http://localhost:3000');
    // this.socket = io('http://10.0.2.2:3000');
   }

  ngOnInit() {

    // this.medicationService.getCategories().subscribe((categories: any) => {
    //   this.categoriesArray = categories;

    // })

    Notification.requestPermission();
    
  }

  ngAfterViewInit() {
    // this.medicationsFromChild = this.medicationsArr.medications;

    // console.log(this.medicationsArr);

    // this.selectedCategoryID = this.categoryId.selectedCategoryID;
    // console.log(this.selectedCategoryID);

    this.socket.on('notification', function (msg) {
        let intakeMinutes = msg[Object.keys(msg)[1]];
        let intakeHour = msg[Object.keys(msg)[0]];
        let medicationName = msg[Object.keys(msg)[2]];
        


        let img = "../../assets/medicine.png";
        let text = "Time to take your medication: " + medicationName;
        const n = new Notification('Medication Tracker', { body: text, icon: img });
        // alert("Time to take your medication at: " + intakeHour +":" + intakeMinutes + " o'clock");
        
    });


  }



}
