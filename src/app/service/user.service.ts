import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { LoginRequest } from './LoginRequest';
import { LoginResponse } from './LoginResponse';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginResponse!:LoginResponse;
  baseUrl = "http://localhost:8080";
  user:any;

  constructor(private http:HttpClient, private router:Router) { }

  loginRequest(request:LoginRequest ){
    return this.http.post(`${this.baseUrl}/login`,request);
  }

  loginUser(data:any){
    localStorage.setItem("token",data.jwtToken);
    localStorage.setItem("userId",data.userId);
    this.user=data.user;
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token==undefined || token=='' || token==null){
      return false;
    }
    else{
      return true;
    }
  }
  
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    this.router.navigate(['/login']);
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  getUserData(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.baseUrl}/user/${userId}`);
}


}
