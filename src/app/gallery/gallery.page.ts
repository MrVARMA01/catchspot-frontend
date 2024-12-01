import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  
  baseUrl = "http://localhost:8080";
  collectionId:any;
  files: any[] = [];
  prevImage:any;
  collectionName!:string;

  constructor(private route: ActivatedRoute, private router:Router, private apiService:ApiService, private toastController: ToastController) {
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
   }


  ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    this.getfilesofCollection();
  }

  getfilesofCollection(){
    this.apiService.getCollection(this.collectionId).subscribe(
      (response:any)=>{
        this.files=response.files;
        this.collectionName = response.name;
      },
      (error:any)=>{
        console.error(error);
      }
    )
  }

  isRenameModalOpen = false;
  setRenameModalOpen(isOpen: boolean) {
    this.isRenameModalOpen = isOpen;
  }

  renameCollection(){
    this.apiService.renameCollection(this.collectionId, this.collectionName).subscribe(
      async (resp: any) => {
        console.log(resp);
        this.setNewFilesOpen(false);
        const toast = await this.toastController.create({
          message: 'Collection Renamed!',
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


  isNewFilesModalOpen = false;
  setNewFilesOpen(isOpen: boolean) {
    this.isNewFilesModalOpen = isOpen;
  }
   // Array to store selected images
   uploadedImages: File[] = [];
   // Array to store image URLs for preview
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
 
   uploadToCollection() {
     this.apiService.uploadToCollection(this.collectionId, this.uploadedImages).subscribe(
       async (resp: any) => {
         console.log(resp);
         this.setNewFilesOpen(false);
         const toast = await this.toastController.create({
           message: 'Files Added!',
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
 
   routeToPrevImage(imageId:number){
    this.router.navigate([`prev-file/${imageId}`]);
   }
}
