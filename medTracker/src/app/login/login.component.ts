import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {}

  onLoginButtonClicked(email: string, password: string){
    debugger;
    this.authservice.login(email, password).subscribe((res: HttpResponse<any>)=> {
      if (res.status === 200) {
        // we have logged in successfully
        this.router.navigate(['tabs/tab1/categories/:categoryId']);
      }
   
      console.log(res);
      
    });
  }

}
