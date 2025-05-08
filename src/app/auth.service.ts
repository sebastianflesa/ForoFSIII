import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router ) { }
  private apiUsersUrl = environment.apiUsersUrl;


  login(email: string, password: string) : Observable<boolean> {
    const apiUrl = this.apiUsersUrl.concat('/usuarios/login');
    const body = { nombreUsuario: email, contraseña: password };
    return this.http.post(apiUrl, body, { responseType: 'json'}).pipe(
      map((response: any) => {
        console.log(response);
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('isLoggedIn', 'true');
          return true;
        } else {
          console.error('Invalid credentials');
          return false;
        }
      })
    );
    
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
