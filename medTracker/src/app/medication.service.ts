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

  getHistory() {
    
    return this.webReqService.get('history');
  }

  createHistory(date: string, medicationName: string, intakeHour: number, intakeMinutes: number) {
    // We want to send a web request to create a category
    return this.webReqService.post('history', { date, medicationName, intakeHour, intakeMinutes});
  }

  showNotification({ message }) {
    const infoContainer = document.getElementById('info');
    console.log(infoContainer);
    
    infoContainer.style.display = 'block';
    infoContainer.textContent = message;
    setTimeout(() => {
        infoContainer.textContent = '';
        infoContainer.style.display = 'none';
    }, 5000);
}
}
