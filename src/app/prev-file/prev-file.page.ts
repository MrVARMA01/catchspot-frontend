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
  post=false;

  constructor(private apiService:ApiService, private route:ActivatedRoute) {}
   
  ngOnInit() {
    this.fileId = this.route.snapshot.paramMap.get('id');
    this.getFile(this.fileId);
  }

  getFile(id:number){
    this.apiService.getFile(id).subscribe(
      (response:any)=>{
        this.prevFile=response;
        this.post=this.prevFile.post;
      },
      (error:any)=>{console.error(error);
      }
    );
  }

  postToggle(){
    if (this.post === true){
      this.post = false;
    }
    else if(this.post === false){
      this.post = true;
    }
  }
}
