import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicationService } from 'src/app/medication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private medicationService: MedicationService, private router: Router, private location: Location) { }

  categoryId: string;

  subsciption: Subscription;
  subscription2: Subscription;

  ngOnInit() {

    this.subsciption = this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params.categoryId;
      }
    )
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();

    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }

  updateCategory(title: string) {
    this.subscription2 = this.medicationService.updateCategory(this.categoryId, title).subscribe(() => {
    
      this.router.navigate([ 'tabs/tab1/categories/:categoryId']);
      
      this.medicationService.showNotification({ message:'Updated category successfully!' });
    });

  }

  goBack(){
    this.location.back();
  }

}
