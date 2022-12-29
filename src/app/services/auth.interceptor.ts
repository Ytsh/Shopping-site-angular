import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { baseAPI } from '../baseAPI/baseAPI';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authenticationService.userValue;
    // console.log("hi")
        const isLoggedIn = user?.accessToken;
        const isApiUrl = request.url.startsWith(baseAPI.apiBaseUrl);
        // console.log("token",user)
        if (isLoggedIn && isApiUrl) {
          // console.log(request)
            request = request.clone({
                setHeaders: {
                    Authorization: `${user.tokenType} ${user.accessToken}`
                }                
            });
        }
        console.log(request)

    return next.handle(request);
  }
}
