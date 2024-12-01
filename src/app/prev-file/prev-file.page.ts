import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prev-file',
  templateUrl: './prev-file.page.html',
  styleUrls: ['./prev-file.page.scss'],
})
export class PrevFilePage implements OnInit {

  baseUrl = "http://localhost:8080";
  files: any[] = [];
  fileId:any;
  prevFile:any;
  progress = 0;

  constructor(private apiService:ApiService, private route:ActivatedRoute) {
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);
  }
   
  ngOnInit() {
    this.fileId = this.route.snapshot.paramMap.get('id');
    this.getFile(this.fileId);
  }

  getFile(id:number){
    this.apiService.getFile(id).subscribe(
      (response:any)=>{
        this.prevFile=response;
      },
      (error:any)=>{console.error(error);
      }
    );
  }
}
