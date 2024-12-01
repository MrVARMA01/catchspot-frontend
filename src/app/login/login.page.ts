import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../service/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginRequest:LoginRequest = new LoginRequest();

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {

  }

  login() {
    this.userService.loginRequest(this.loginRequest).subscribe(
      (resp: any) => {
        if(resp != null){
          this.userService.loginUser(resp);
          this.router.navigate(['/tabs/tab1']);
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

}
