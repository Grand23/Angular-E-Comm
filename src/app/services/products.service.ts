import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://fakestoreapi.com/products'

  private userUrl= 'https://fakestoreapi.com/users'

  

  constructor(private httpClient:HttpClient) { }
  
  getProduct(): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl)
  }
  getUserById(userId: number): Observable<any>{
    return this.httpClient.get<any>(this.userUrl + '/' + userId)
  }
}
