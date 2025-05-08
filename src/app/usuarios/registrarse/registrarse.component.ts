import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})

export class RegistrarseComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    fechaNacimiento: ''
  };

  aceptaTerminos: boolean = false;
  error: boolean = false;
  mensajeError: string = '';

  today: string = new Date().toISOString().split('T')[0];
  authService: any;
    registroForm!: NgForm;

  constructor(private userService: UserService, private router: Router) {}

  registrarse(form: NgForm) {
    if (form.invalid || !this.aceptaTerminos) {
      this.error = true;
      this.mensajeError = 'Por favor, completa correctamente todos los campos.';
      return;
    }

    const body = {
      nombre: this.user.name,
      nombreUsuario: this.user.username,
      email: this.user.email,
      fechaNacimiento: this.user.fechaNacimiento,
      contraseña: this.user.password,
      estado: 1,
      rol: {
        id: 2,
      }
    };

    this.userService.crearUsuario(body).subscribe({
      next: (response) => {
        if (response.success) {
          this.error = false;
          this.mensajeError = 'Usuario creado correctamente.';
          alert('Usuario creado correctamente');
          this.router.navigate(['/auth/login']);
          return;
        } else {
          this.error = true;
          this.mensajeError = 'Error al crear usuario.';
        }
        
  
        
        
      },
      error: (err: any) => {
        this.error = true;
        this.mensajeError = 'Error al crear usuario.';
        console.error(err);
      }
    });
  }
}