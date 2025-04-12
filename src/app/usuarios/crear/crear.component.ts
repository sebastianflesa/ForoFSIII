import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInterface } from '../../interfaces/user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
  constructor(private userService: UserService, private router: Router) {}
  
  user: UserInterface = {
    id: 0,
    username: '',
    email: '',
    password: '',
    roles: [],
    name: '',
    status: false,
    createdAt: new Date()
  };

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormTouched(form);
      return;
    }

    this.userService.saveUser(this.user).subscribe((response) => {
      alert('Usuario creado correctamente');
      this.router.navigate(['/usuarios']);
      console.log('Usuario creado:', this.user);

    })

  }
  
  markFormTouched(form: NgForm): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
