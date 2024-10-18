import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service'; // Pastikan path ke AuthService sesuai
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.firstName = user.firstName; 
      this.lastName = user.lastName;   
    }
  }

  get welcomeMessage() {
    return `Welcome user: ${this.firstName} ${this.lastName}`;
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }
}
