import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserInterface } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {  

  user: UserInterface = {
    id: 0,
    nombre: '',
    username: '',
    email: '',
    password: '',
    name: '',
    status: true,
    createdAt: new Date(),
    nombreUsuario: '',
    fechaNacimiento: new Date(),
    contraseña: ''
  };
  
  constructor(private userService: UserService, private router: Router, private authService:AuthService) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormTouched(form);
      return;
    }
    this.updatePerfil();
  }
  
  markFormTouched(form: NgForm): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  
  ngOnInit(): void {  
    this.getUserLogeado();
  }

  getUserLogeado() {
    const user = localStorage.getItem('user');
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      const parsedUser = JSON.parse(userStr);
      this.user = {
        id: parsedUser.data.id,
        nombre: parsedUser.data.nombreUsuario,
        username: parsedUser.data.nombreUsuario,
        email: parsedUser.data.email,
        password: parsedUser.data.password,
        name: parsedUser.data.nombre || '',
        nombreUsuario: parsedUser.data.nombreUsuario,
        status: true,
        createdAt: parsedUser.data.createdAt || new Date(),
        fechaNacimiento: parsedUser.data.fechaNacimiento || new Date(),
        contraseña: parsedUser.data.password
      };
      console.log("user data logueado");
      console.log(this.user);


    }

   
  }

  updatePerfil() {
    this.user.contraseña = this.user.password;

    this.userService.updateUserApi(this.user).subscribe(updatedUser => {
      console.log(updatedUser);
      if (updatedUser) {
        //localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Perfil actualizado correctamente');
        this.authService.logout();
      }
      else {
        alert('Error al actualizar el perfil');
      }
    });

  
  }

}
