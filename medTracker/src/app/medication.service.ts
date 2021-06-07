import { Injectable } from '@angular/core';
import { Medication } from './models/medication.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private webReqService: WebRequestService) { }

  // aTask: any;

  getCategories() {
    
    return this.webReqService.get('categories');
  }
  
  createCategory(title: string) {
    // We want to send a web request to create a category
    return this.webReqService.post('categories', { title });
  }

  updateCategory(id: string, title: string) {
    // We want to send a web request to create a list
    return this.webReqService.patch(`categories/${id}`, { title });
  }

  updateMedication(categoryId: string, medicationId: string, title: string, intakeHour: number, intakeMinutes: number) {
    // We want to send a web request to create a list
    return this.webReqService.patch(`categories/${categoryId}/medications/${medicationId}`, { title, intakeHour, intakeMinutes });
  }


  deleteCategory(id: string){
    return this.webReqService.delete(`categories/${id}`);
  }

  deleteMedication(categoryId: string, medicationId: string){
    return this.webReqService.delete(`categories/${categoryId}/medications/${medicationId}`);

  }

  getMedications(categoryId: string) {

    return this.webReqService.get(`categories/${categoryId}/medications`);
  }

  getMedication(categoryId: string, medicationId: string){
    return this.webReqService.get(`categories/${categoryId}/medications/${medicationId}`);
  }

  

  createMedication(title: string, categoryId: string, intakeHour: number, intakeMinutes: number) {
    // We want to send a web request to create a medication
    return this.webReqService.post(`categories/${categoryId}/medications`, { title, intakeHour, intakeMinutes });
  }

  complete(medication: Medication){
    return this.webReqService.patch(`categories/${medication._categoryId}/medications/${medication._id}`, {
      //set the boolean to the opposite of the previous state (to toggle the completed)
      completed: !medication.completed
    })
  }
}
