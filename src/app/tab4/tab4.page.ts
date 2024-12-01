import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';
import { ChatService } from '../service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  user:any;
  users:any;

  constructor(private apiService:ApiService, private userService:UserService, private chatService:ChatService, private router:Router) { }

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (userData:any) => {
        this.user = userData; // Assign user data
        this.allChattedConnects();
      },
      (error:any) => {
        console.error("Error fetching user data: ", error);
      }
    );
  }

  allChattedConnects(){
    this.apiService.getAllConnectsForSearch(this.user.userId).subscribe(
      (response:any)=>{
        this.users = response;
      },
      (error:any)=>{console.error(error);
      }
    )
  }

  chatRoom(user2:number) {    
    this.chatService.getChatRoom(this.user.userId,user2).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate([`/chat/${response}/${user2}`]);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
