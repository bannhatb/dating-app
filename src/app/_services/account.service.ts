import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, pipe } from 'rxjs';
import { AuthUser, RegisterUser, UserToken } from '../_models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new  HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private httpClient: HttpClient) { }
  baseUrl = 'https://localhost:7161/api/Auth/';

  private currentUser = new BehaviorSubject< UserToken | null>(null);
  currentUser$ = this.currentUser.asObservable();

  login(authUser: AuthUser ) : Observable<any> {
    return this.httpClient
    .post(`${this.baseUrl}login`, authUser, {
      responseType: 'text',
      headers: this.headers,
    })
    .pipe(
      map((token) => {
        if(token){
          const userToken: UserToken = { username: authUser.username, token };
          localStorage.setItem('userToken', JSON.stringify(userToken));
          this.currentUser.next(userToken);
        }
      })
    )
  };

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
  };

  reLogin() {
    const storageUser = localStorage.getItem('userToken');
    if (storageUser) {
      const currentUser = JSON.parse(storageUser);
      this.currentUser.next(currentUser);
    }
  }


  register(registerUser: RegisterUser) {
    return this.httpClient
      .post(`${this.baseUrl}register`, registerUser, {
        responseType: 'text',
        headers: this.headers,
      })
      .pipe(
        map((token) => {
          if (token) {
            const userToken: UserToken = { username: registerUser.username, token };
            localStorage.setItem('userToken', JSON.stringify(userToken));
            this.currentUser.next(userToken);
          }
        })
      );
  }



}


