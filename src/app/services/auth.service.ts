import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { error } from 'console';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='https://fakestoreapi.com/auth/login'
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId:object) { }
  login(username:string, password:string) {
    return this.httpClient.post(this.apiUrl,{username,password}).pipe(
      map(userData => {
        this.setCurrentUser(userData)
        this.currentUserSubject.next(userData)
        return userData
      }),
      catchError((error: HttpErrorResponse) =>{
        console.log('login failed', error);
        return throwError(() => error)
      })
    )
  }
  getCurrentUser():any{
    if(isPlatformBrowser(this.platformId)){
      const storedUser = localStorage.getItem('currentUser')
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null;
  }
  setCurrentUser(user:any):any{
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem('currentUser', JSON.stringify(user))
    }
  }
  get currentUser$(): Observable<any>{
    return this.currentUserSubject.asObservable()
  }
  logout(){
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('currentUser')
    }
    this.currentUserSubject.next(null)
  }
  isLoggedin():boolean{
    return this.getCurrentUser() !== null
  }
}
