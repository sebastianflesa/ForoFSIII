import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    console.log(this.username);
    this.auth.login(this.username, this.password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = true;
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.error = true;
      }
    );
    
  }

  /*
  login(): void {
    this.auth.login(this.user).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = true;
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.error = true;
      }
    );
  }
  */
}