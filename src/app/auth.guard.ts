import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user.data.rol.nombreRol);

    //validar que solo admin ingrese a /usuarios/lista
    

    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
