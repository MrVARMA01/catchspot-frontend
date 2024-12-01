import { Component, OnInit } from '@angular/core';
import { User } from '../service/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  baseUrl = "http://localhost:8080";
  user:any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (userData) => {
        this.user = userData; // Assign user data        
      },
      (error) => {
        console.error("Error fetching user data: ", error);
      }
    );       
  }


  logout(){
    this.userService.logout();
  }

}
