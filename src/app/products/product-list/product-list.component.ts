import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { error } from 'console';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [NgFor,NgIf, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  
  products: any[] = []
  loader = true
  userNames : {[userId:number] : {username:string, image:string}} = {}
  constructor(private productsService:ProductsService, router:Router){}

  ngOnInit(){
    this.loadProducts()
  }

  loadProducts(){
    this.loader =true 
    this.productsService.getProduct().subscribe({
      next: (productData) => {
        this.products = productData 
        this.loadUserNames
        this.loader = false
      }, error: (error) =>{
        console.log(error);
      }
    })
  }
  loadUserNames(){
    const userIds = [...new Set(this.products.map(products => products.userId))]
    userIds.forEach(userId =>{
      this.productsService.getUserById(userId).subscribe({
        next: (user) =>{
          this.userNames[userId] = {
            username:user.username,
            image:user.image
          }
        }, error: (error) =>{
          console.log(error);
        }
      })
    })
  }
}
