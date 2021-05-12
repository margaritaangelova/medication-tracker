import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MedicationService } from '../medication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {

  constructor(private medicationService: MedicationService ,private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {}

  createCategory(title: string) {
    this.medicationService.createCategory(title).subscribe((category: any) => {

      //now we navigate to /categoryies/category._id
      this.router.navigate([ 'tabs/tab1/categories', category._id ]); 
    });

  }

  goBack(){
    this.location.back();
  }
}
