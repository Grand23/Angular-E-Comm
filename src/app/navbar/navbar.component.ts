import { Component , OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser:any = null;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(){
    this.authService.currentUser$.subscribe(user =>{
      console.log(user);
  
      this.currentUser = user ?? null;
    })
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
