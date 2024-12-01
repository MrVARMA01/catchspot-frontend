import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('modal', { static: false }) modal!: IonModal;

  baseUrl = "http://localhost:8080";
  userId:any;
  user: any;
  userConnects: any;
  connectsCount!: number;
  collections: any;
  images: any;

  constructor(private apiService: ApiService, private userService: UserService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.apiService.getUser(this.userId).subscribe(
      (userData:any) => {
        console.log(userData);
        this.user = userData; // Assign user data
        this.connectsCount = userData.connects.length;
        this.userCollections(); // Fetch collections after user data is available
        this.getUserConnects();
      },
      (error:any) => {
        console.error("Error fetching user data: ", error);
      }
    );
  }

  isConnectsModalOpen = false; // Track the modal state
  openConnectsModal() {
    this.isConnectsModalOpen = true; // Open the modal
  }
  closeConnectsModal() {
    this.isConnectsModalOpen = false; // Close the modal
  }


  userCollections() {
    if (this.user && this.user.userId) {
      this.apiService.getuserCollections(this.user.userId).subscribe(
        (resp: any) => {
          this.collections = resp;
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.error("User data is not available.");
    }
  }

  getUserConnects() {
    if (this.user && this.user.userId) {
      this.apiService.getUserConnects(this.user.userId).subscribe(
        (resp: any) => {
          this.userConnects=resp;
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.error("User data is not available.");
    }
  }


}
