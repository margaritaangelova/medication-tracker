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
        console.log(params);
        
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
      // this.router.navigate(['/categories', this.categoryId]);
      this.router.navigate(['']);
    });

  }

  goBack(){
    this.location.back();
  }

}
