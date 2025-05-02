import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { CommonModule  } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    if (user.data.rol.nombreRol === 'admin') {
        this.isAdmin = true;
    }
  }

}