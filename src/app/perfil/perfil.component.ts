import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserInterface } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
    username: '',
    email: '',
    password: '',
    roles: [],
    name: '',
    status: true,
    createdAt: new Date()
  };
  
  constructor(private userService: UserService) {}

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
        id: parsedUser.id,
        username: parsedUser.username,
        email: parsedUser.email,
        password: parsedUser.password,
        roles: parsedUser.roles || [],
        name: parsedUser.name || '',
        status: parsedUser.status || '',
        createdAt: parsedUser.createdAt || new Date()
      };
    }
  }

  updatePerfil() {
    this.userService.updateUser(this.user).subscribe(updatedUser => {
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Perfil actualizado correctamente');
        
      } else {
        alert('Error al actualizar el perfil');
      }
    });
  }

}
