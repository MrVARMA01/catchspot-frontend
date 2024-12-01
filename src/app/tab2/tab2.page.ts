import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('modal', { static: false }) modal!: IonModal;

  baseUrl = "http://localhost:8080";
  posts: any[] = [];
  connectsPosts: any[] = [];
  users: any[] = [];
  user: any;
  connectButtonColor = 'danger';

  constructor(private apiService: ApiService, private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userService.getUserData().subscribe(
      (userData: any) => {        
        this.user = userData; // Assign user data
        this.getAllPosts();
        this.getConnectsPosts();
        this.getAllConnectsForSearch();
      },
      (error: any) => {
        console.error("Error fetching user data: ", error);
      }
    );

  }





  // --------------------------------- ALL ABOUT POSTS --------------------------------- //

  getAllPosts() {
    this.apiService.getAllPosts().subscribe(
      (response: any) => {
        // console.log("all posts ::: ",response);        
        this.posts = response;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  getConnectsPosts() {
    this.apiService.getConnectsPosts(this.user.userId).subscribe(
      (response: any) => {
        // console.log("connects posts ::: ",response);
        this.connectsPosts = response;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }





  // --------------------------------- ALL ABOUT CONNECTS --------------------------------- //

  //  CONNECTS MODEL  //
  isModalOpen = false; // Track the modal state
  openModal() {
    this.isModalOpen = true; // Open the modal
  }
  closeModal() {
    this.isModalOpen = false; // Close the modal
  }

  getAllConnectsForSearch() {
    this.apiService.getAllConnectsForSearch(this.user.userId).subscribe(
      (response: any) => {
        this.users = response;
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  requestConnect(connectId: number) {
    this.apiService.sendConnectRequest(this.user.userId, connectId).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  routeToProfile(userId: number) {
    this.closeModal();
    this.router.navigateByUrl(`/profile/${userId}`);
  }


}
