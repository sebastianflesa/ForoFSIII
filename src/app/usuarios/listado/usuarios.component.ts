import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';

@Component({  
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;

  constructor(private readonly userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.fetchUsersFromApi().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      console.log(users);
    });
    

  }
  onDeleteUser(userId: number) {
    if (!confirm('¡¿Esta seguro de eliminar este usuario?!')) {
      return;
    }
    const body = {id: userId};
    this.userService.borrarUsuario(body).subscribe(() => {
      this.ngOnInit();
    });
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
