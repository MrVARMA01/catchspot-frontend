import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient, private userService: UserService) { }


  getUser(id:any){
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }




  // ------------------------------------ ALL ABOUT COLLECTIONS ------------------------------------ //

  getuserCollections(id: number) {
    return this.http.get(`${this.baseUrl}/user-collections?userId=${id}`).pipe(
      catchError(error => {
        console.error('Error fetching collections', error);
        return throwError(() => new Error('Failed to fetch collections.'));
      })
    );
  }

  getCollection(id: number) {
    return this.http.get(`${this.baseUrl}/collection?collectionId=${id}`);
  }

  newCollection(userId: number, name: string, imageFiles: File[]) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('collectionName', name);

    imageFiles.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post(`${this.baseUrl}/create-collection`, formData);
  }

  uploadToCollection(collectionId: any, imageFiles: File[]){
    const formData = new FormData();
    formData.append('collectionId', collectionId.toString());
    imageFiles.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post(`${this.baseUrl}/upload-to-collection`, formData);
  }

  renameCollection(collectionId: any, name:string){
    const formData = new FormData();
    formData.append('collectionId', collectionId.toString());
    formData.append('collectionName', name);
    return this.http.post(`${this.baseUrl}/rename-collection`, formData);
  }





  // ------------------------------------ ALL ABOUT Files ------------------------------------ //

  getFile(fileId:number) {
    return this.http.get(`${this.baseUrl}/file/${fileId}`);
  }




  // ------------------------------------ ALL ABOUT CONNECTS ------------------------------------ //

  getUserConnects(userId:number) {
    return this.http.get(`${this.baseUrl}/get-user-connects?userId=${userId}`);
  }

  getUserAllGotConnectRequests(userId:number) {
    return this.http.get(`${this.baseUrl}/get-user-all-got-connect-requests/${userId}`);
  }

  sendConnectRequest(userId:number, connectId:number){
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('connectId', connectId.toString());
    return this.http.post(`${this.baseUrl}/send-connect-request`, formData);
  }

  acceptConnectRequest(userId:number, connectId:number){
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('connectId', connectId.toString());
    return this.http.post(`${this.baseUrl}/accept-connect-request`, formData);
  }

  getAllConnectsForSearch(userId:number){
    return this.http.get(`${this.baseUrl}/all-connects/${userId}`);
  }





  // ------------------------------------ ALL ABOUT POSTS ------------------------------------ //

  getAllPosts() {
    return this.http.get(`${this.baseUrl}/all-posts`);
  }
  getConnectsPosts(userId:number) {
    return this.http.get(`${this.baseUrl}/all-connects-posts/${userId}`);
  }
}
