import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService:UserService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.userService.getToken();
        let newReq = req;
        if (token) {
          newReq = newReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(newReq).pipe(
          catchError(error => {
            if (error.status === 401) {
              this.userService.logout(); // Redirect or handle unauthorized access
            }
            return throwError(() => error);
          })
        );
      }
      

}