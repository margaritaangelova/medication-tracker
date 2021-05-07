import { Injectable } from '@angular/core';
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

  // updateTask(listId: string,taskId: string, title: string) {
  //   // We want to send a web request to create a list
  //   return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  // }


  deleteCategory(id: string){
    return this.webReqService.delete(`categories/${id}`);
  }

  // deleteTask(listId: string, taskId: string){
  //   return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);

  // }

  getMedications(categoryId: string) {

    return this.webReqService.get(`categories/${categoryId}/medications`);
  }

  // getTask(listId: string, taskId: string){
  //   return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  // }

  

  createMedication(title: string, categoryId: string, frequency: number, intakeTime: number) {
    // We want to send a web request to create a medication
    return this.webReqService.post(`categories/${categoryId}/medications`, { title, categoryId, frequency, intakeTime });
  }

  // complete(task: Task){
  //   return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
  //     //set the boolean to the opposite of the previous state (to toggle the completed)
  //     completed: !task.completed
  //   })
  // }
}
