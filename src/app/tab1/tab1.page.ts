import { Component, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('modal', { static: false }) modal!: IonModal;

  baseUrl = "http://localhost:8080";
  user: any;
  userConnects: any;
  userConnectRequests: any;
  connectsCount!: number;
  collections: any;
  images: any;
  selectedSegment: string = 'connects'; // Default segment is 'all'

  constructor(private tab1Service: ApiService, private userService: UserService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }


  ngOnInit() {

    this.userService.getUserData().subscribe(
      (userData) => {
        this.user = userData; // Assign user data
        this.connectsCount = userData.connects.length;
        if (this.user) {
          this.userCollections(); // Fetch collections after user data is available
          this.getUserConnects();
          this.getUserConnectRequests();
        }
      },
      (error) => {
        console.error("Error fetching user data: ", error);
      }
    );
    
  }





  // ------------------------------------ ALL ABOUT COLLECTIONS ------------------------------------ //

  userCollections() {
    if (this.user && this.user.userId) {
      this.tab1Service.getuserCollections(this.user.userId).subscribe(
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

  //  COLLECTION MODEL  //
  isNewCollectionModalOpen = false;
  setNewCollectionOpen(isOpen: boolean) {
    this.isNewCollectionModalOpen = isOpen;
  }

  // Array to store selected images
  uploadedImages: File[] = [];
  collectionName!: string;
  imageUrls: string[] = [];
  // Method to handle file selection
  uploadFiles(event: any) {
    const files: FileList = event.target.files;
    // Loop through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Store the file in the array
      this.uploadedImages.push(file);
      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrls.push(e.target.result); // Add the image URL to the array for preview
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
    console.log(this.uploadedImages, this.imageUrls);
  }
  // Method to remove an image from the arrays
  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);  // Remove the image from the uploadedImages array
    this.imageUrls.splice(index, 1);       // Remove the corresponding image URL from the imageUrls array
  }
  newCollection() {
    this.tab1Service.newCollection(this.user.userId, this.collectionName, this.uploadedImages).subscribe(
      async (resp: any) => {
        // console.log(resp);
        this.setNewCollectionOpen(false);
        const toast = await this.toastController.create({
          message: 'Collection Added!',
          duration: 1500,
          position: 'top',
        });
        await toast.present();
        window.location.reload();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }





  // ------------------------------------ ALL ABOUT COLLECTIONS ------------------------------------ //

  //  CONNECTS MODEL  //
  isConnectsModalOpen = false; // Track the modal state
  openConnectsModal() {
    this.isConnectsModalOpen = true; // Open the modal
  }
  closeConnectsModal() {
    this.isConnectsModalOpen = false; // Close the modal
  }
  // Method to handle segment change
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getUserConnects() {
    if (this.user && this.user.userId) {
      this.tab1Service.getUserConnects(this.user.userId).subscribe(
        (resp: any) => {
          this.userConnects = resp;
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.error("User data is not available.");
    }
  }

  getUserConnectRequests() {
    if (this.user && this.user.userId) {
      this.tab1Service.getUserAllGotConnectRequests(this.user.userId).subscribe(
        (resp: any) => {
          this.userConnectRequests = resp;
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.error("User data is not available.");
    }
  }

  acceptConnectRequest(connectId: number) {
    if (this.user && this.user.userId) {
      this.tab1Service.acceptConnectRequest(this.user.userId, connectId).subscribe(
        (resp: any) => {
          console.log(resp);
        },
        (err: any) => {
          console.error(err);
        }
      );
    } else {
      console.error("User data is not available.");
    }
  }



  logout() {
    this.userService.logout();
  }

}
