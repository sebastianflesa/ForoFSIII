import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isAdmin: boolean = false;
  
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.roles[0] === 'admin') {
        this.isAdmin = true;
    }
  }

}