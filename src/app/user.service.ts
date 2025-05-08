import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserInterface } from './interfaces/user';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const USERS_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: UserInterface[] = [];
  private currentUserSubject = new BehaviorSubject<UserInterface | null>(null);
  private apiUsersUrl = environment.apiUsersUrl;

  constructor( private http: HttpClient) {
    this.loadUsersFromStorage();
  }

  fetchUsersFromApi(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUsersUrl.concat('/usuarios/lista'));
  }

  

  private loadUsersFromStorage(): void {
    const data = localStorage.getItem(USERS_KEY);
    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = [
       
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

  updateUserApi(user: UserInterface): Observable<UserInterface> {
    const apiUrl = this.apiUsersUrl.concat('/usuarios/actualizar');
    console.log(user);
    return this.http.post<UserInterface>(apiUrl, user);
  }

  crearUsuario(data: any): Observable<any> {
    const apiUrl = this.apiUsersUrl.concat('/usuarios/crear');
    return this.http.post(apiUrl, data);
  }

  borrarUsuario(data: any): Observable<any> {
    const apiUrl = this.apiUsersUrl.concat('/usuarios/borrar');
    return this.http.post(apiUrl, data);
  }



}
