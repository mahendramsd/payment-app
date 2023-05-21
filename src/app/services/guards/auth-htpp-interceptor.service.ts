import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Constants } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root',
})
export class AuthHtppInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(Constants.LOCAL_STORE_RESOURSES.TOKEN);
    const basic = "Bearer " +token;  
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: basic
        },
      });
    }
    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      this.authService.logout();
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
