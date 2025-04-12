import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService ) { }

  login(email: string, password: string): Observable<boolean> {
    let isAuthenticated = false;
    this.userService.getUserByUsernamePassword(email, password).subscribe(
      (response) => {
        if (response) {
          isAuthenticated = true;
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          console.error('Invalid credentials');
        }
      }
    );
    return of(isAuthenticated);
  }
  

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    console.log(localStorage);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
