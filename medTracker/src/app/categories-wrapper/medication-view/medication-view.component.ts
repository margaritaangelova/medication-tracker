import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicationService } from 'src/app/medication.service';
import { Medication } from 'src/app/models/medication.model';

@Component({
  selector: 'app-medication-view',
  templateUrl: './medication-view.component.html',
  styleUrls: ['./medication-view.component.scss'],
})
export class MedicationViewComponent implements OnInit {
  @Input() medications: Medication[];

  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  
  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router) { }

  categoryId: string;

  ngOnInit() {

    this.subscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.categoryId = params.get('categoryId');
        
        this.subscription2 = this.medicationService.getMedications(this.categoryId).subscribe((medications: any) => {
          this.medications = medications;
          
          
        });

      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

    
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }

    if(this.subscription3){
      this.subscription3.unsubscribe();
    }

    if(this.subscription4){
      this.subscription4.unsubscribe();
    }
  }

  onMedicationDeleteCick(id: string){
    this.subscription3 = this.medicationService.deleteMedication(this.categoryId, id).subscribe(() => {
      this.medications = this.medications.filter(val => val._id !== id);

      this.medicationService.showNotification({ message:'Deleted successfully!' });
    });
  }

  onTakeMedication(medication: Medication){

    let currentDate  = new Date();
    let date = currentDate.toLocaleDateString();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    this.subscription4 = this.medicationService.createHistory(date, medication.title, hours, minutes).subscribe(() => {
      this.medicationService.showNotification({ message:'Medication taken for today!' });
    });

    
  }

  

}
