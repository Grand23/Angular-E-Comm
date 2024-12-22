import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ''
  password = ''

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    this.authService.login(this.username, this.password).subscribe({
      next: (user) =>{
        this.router.navigate(['/products'])
      },
      error:() =>{
        console.log('error');
      }
    })
  }

}
