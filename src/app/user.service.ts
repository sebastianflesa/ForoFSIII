import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserInterface } from './interfaces/user';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: UserInterface[] = [];
  private currentUserSubject = new BehaviorSubject<UserInterface | null>(null);

  constructor() {
    this.loadUsersFromStorage();
  }

  private loadUsersFromStorage(): void {
    const data = localStorage.getItem(USERS_KEY);
    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = [
        {
          id: 1, username: "admin", name: 'sebasss', email: 'sebasss@example.com', password: '1234', roles: ['admin'],
          status: true,
          createdAt: new Date()
        },
        {
          id: 2, username: "juanin", name: 'juanin', email: 'juanin@example.com', password: '1234', roles: ['user'],
          status: true,
          createdAt: new Date()
        },
      ];
      this.saveUsersToStorage();
    }
  }

  private saveUsersToStorage(): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
  }

  getUserByUsernamePassword(username: string, password: string): Observable<UserInterface | null> {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      return of(user);
    } else {
      return of(null);
    }
  }

  getAllUsers(): Observable<UserInterface[]> {
    return of(this.users);
  }

  getPerfilUser(idUser: number): Observable<UserInterface | null> {
    const user = this.users.find(user => user.id === idUser);
    this.currentUserSubject.next(user || null);
    return this.currentUserSubject.asObservable();
  }

  saveUser(user: UserInterface): Observable<UserInterface> {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };
    this.users.push(newUser);
    this.saveUsersToStorage();
    return of(newUser);
  }

  updateUser(updatedUser: UserInterface): Observable<UserInterface | null> {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsersToStorage();
      return of(updatedUser);
    }
    return of(null);
  }

  getCurrentUser(): Observable<UserInterface | null> {
    return this.currentUserSubject.asObservable();
  }


}
