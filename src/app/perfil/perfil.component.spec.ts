import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserInterface } from '../interfaces/user';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockUser = {
    data: {
      id: 1,
      nombre: 'Sebastián',
      nombreUsuario: 'seba123',
      email: 'seba@example.com',
      password: '123456',
      createdAt: new Date(),
      fechaNacimiento: new Date()
    }
  };

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['updateUserApi']);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PerfilComponent, CommonModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate user data from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') return JSON.stringify(mockUser);
      return null;
    });

    component.getUserLogeado();

    expect(component.user.username).toEqual('seba123');
    expect(component.user.email).toEqual('seba@example.com');
  });

  it('should mark form as touched and not submit if form is invalid', () => {
    const form = {
      invalid: true,
      controls: {
        email: { markAsTouched: jasmine.createSpy('markAsTouched') },
        password: { markAsTouched: jasmine.createSpy('markAsTouched') }
      }
    } as unknown as NgForm;

    component.onSubmit(form);

    expect(form.controls['email'].markAsTouched).toHaveBeenCalled();
    expect(form.controls['password'].markAsTouched).toHaveBeenCalled();
    expect(userServiceSpy.updateUserApi).not.toHaveBeenCalled();
  });

  it('should update profile and logout if form is valid', () => {
    const form = {
      invalid: false,
      controls: {}
    } as unknown as NgForm;

    userServiceSpy.updateUserApi.and.returnValue(of({
      id: 1,
      nombre: 'Sebastián',
      nombreUsuario: 'seba123',
      status: true,
      createdAt: new Date(),
      username: 'seba123',
      name: 'Sebastián',
      email: 'seba@example.com',
      password: '123456',
      fechaNacimiento: new Date()
    }));

    spyOn(window, 'alert');

    component.onSubmit(form);

    expect(userServiceSpy.updateUserApi).toHaveBeenCalledWith(jasmine.objectContaining({
      contraseña: component.user.password
    }));
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Perfil actualizado correctamente');
  });

  it('should not populate user if no user data is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
  
    component.getUserLogeado();
  
    expect(component.user.username).toBe('');
    expect(component.user.email).toBe('');
  });

});
