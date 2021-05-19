import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {}

  onLoginButtonClicked(email: string, password: string){
    this.authservice.login(email, password).subscribe((res: HttpResponse<any>)=> {
      console.log(res);
      
    });
  }

}
