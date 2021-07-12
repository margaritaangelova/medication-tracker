import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Category } from 'src/app/models/category.model';
import { Medication } from 'src/app/models/medication.model';
import { onDestroyWorkaround } from 'src/app/shared/helpers/onDestroyWorkaround.helper';
import { MedicationService } from '../../medication.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit, OnDestroy {
  selectedCategoryID: string;
  categoriesArray: Category[] = [];
  medications: Medication[];
  subscription: Subscription = new Subscription();
  subscription2: Subscription;
  subscription3: Subscription;
  subject: Subject<any> = new Subject();

  @Output() medicationsEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private medicationService: MedicationService, private route: ActivatedRoute, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    
    const categoriesSubscription: Subscription = this.medicationService.getCategories().subscribe((categories: any) => {
      this.categoriesArray = categories;
      
    })

    this.subscription.add(categoriesSubscription);

    this.subscription3 = this.subject.asObservable().subscribe((date: number)=> {
      
    });

    this.subscription.add(this.subscription3);
    this.subscription.add(this.subscription2);

    setInterval(() => {
      this.subject.next(Date.now());
    },7000);

    onDestroyWorkaround(this.router,this.subscription);
    

  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

  onCategoryClick(categoryId: string){

    //adding the categoryId to the path:
    this.router.navigateByUrl(`tabs/tab1/categories/${categoryId}`);

    this.selectedCategoryID = categoryId;
    
  }


  onDeleteCategoryClick(){
    this.subscription2 = this.medicationService.deleteCategory(this.selectedCategoryID).subscribe((response) => {

      this.router.navigate(['tabs/tab1/categories/:categoryId'])

      this.medicationService.showNotification({ message:'Deleted category successfully!' });

    });
  }

}
