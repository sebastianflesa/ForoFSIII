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

  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.fetchUsersFromApi().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      console.log(users);
    });
    

  }

  

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
