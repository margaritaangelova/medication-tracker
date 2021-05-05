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

  // updateList(id: string, title: string) {
  //   // We want to send a web request to create a list
  //   return this.webReqService.patch(`lists/${id}`, { title });
  // }

  // updateTask(listId: string,taskId: string, title: string) {
  //   // We want to send a web request to create a list
  //   return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  // }


  // deleteList(id: string){
  //   return this.webReqService.delete(`lists/${id}`);

  // }

  // deleteTask(listId: string, taskId: string){
  //   return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);

  // }

  getMedications(categoryId: string) {

    return this.webReqService.get(`categories/${categoryId}/medications`);
  }

  // getTask(listId: string, taskId: string){
  //   return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  // }

  

  // createTask(title: string, listId: string) {
  //   // We want to send a web request to create a task
  //   return this.webReqService.post(`lists/${listId}/tasks`, { title });
  // }

  // complete(task: Task){
  //   return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
  //     //set the boolean to the opposite of the previous state (to toggle the completed)
  //     completed: !task.completed
  //   })
  // }
}
