import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  products: any[] = []
  loader = true
  userNames : {[userId:number] : {username:string, name:string}} = {}
Products: any;
  constructor(private productsService:ProductsService, router:Router){}

  ngOnInit(){
    this.loadProducts()
  }

  loadProducts(){
    this.loader =true 
    this.productsService.getProduct().subscribe({
      next: (productData) => {
        this.products = productData 
        this.loadUserNames()
      }, error: (error) =>{
        console.log(error);
        this.loader = false
      }
    })
  }
  loadUserNames(){
    const userIds = [...new Set(this.products.map(products => products.userId))]
    const userRequests = userIds.map(userId => this.productsService.getUserById(userId));
    forkJoin(userRequests).subscribe({
        next: (users) =>{
          users.forEach(user => {
            this.userNames[user.id] = {
              username: user.username,
              name: user.name
            }
          });
        }, error: (error) =>{
          console.log(error);
        }
    
    })
  }
}
