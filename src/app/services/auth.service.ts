import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject!: BehaviorSubject<User | null>;
  public user!: Observable<User | null>;


  constructor(private router: Router,private httpClient: HttpClient) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(Constants.LOCAL_STORE_RESOURSES.USER)!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
}

/**
 * user Login
 * @param username 
 * @param password 
 * @returns 
 */
login(username: string, password: string) {
  return this.httpClient.post<any>(`${environment.endPoinUrl}` + Constants.API_END_POINTS.LOGIN, { username, password })
      .pipe(map(res => {
        if(res.status == Constants.HTTP_STATUS.OK) {
          const user  = res.data;
          localStorage.setItem(Constants.LOCAL_STORE_RESOURSES.USER, JSON.stringify(user));
          localStorage.setItem(Constants.LOCAL_STORE_RESOURSES.TOKEN, user.accessToken);
          this.userSubject.next(user);
        }
        return res;
      }));
}


/**
 * isUserLoggedIn
 * @returns 
 */
  public isUserLoggedIn() {
    const user = localStorage.getItem(
        Constants.LOCAL_STORE_RESOURSES.USER
    );
    return !(user === null);
}

/**
 * User Logout
 */
logout() {
  localStorage.removeItem(Constants.LOCAL_STORE_RESOURSES.USER);
  localStorage.removeItem(Constants.LOCAL_STORE_RESOURSES.TOKEN);
  this.userSubject.next(null);
  this.router.navigate(['login']);
}
}
