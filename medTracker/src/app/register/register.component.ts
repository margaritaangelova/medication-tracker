import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {}

  onRegisterButtonClicked(email: string, password: string){
    this.authservice.signup(email, password).subscribe((res: HttpResponse<any>)=> {
      console.log(res);
      
    });
  }

}
