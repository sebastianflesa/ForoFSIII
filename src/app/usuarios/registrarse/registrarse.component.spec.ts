import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RegistrarseComponent } from './registrarse.component';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
import { AuthGuard } from '../../auth.guard';
import { routes } from '../../app.routes';

describe('RegistrarseComponent', () => {
  let component: RegistrarseComponent;
  let fixture: ComponentFixture<RegistrarseComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['updateUserApi']);
    const authServiceMock = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [
        RegistrarseComponent,
        CommonModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthGuard,   useValue: { canActivate: () => true } }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarseComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy      = TestBed.inject(Router)      as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
  

    it('should show error message if form is invalid or terms are not accepted', () => {
        component.aceptaTerminos = false;
        const form = {
            invalid: true
        } as NgForm;

        component.registrarse(form);

        expect(component.error).toBeTrue();
        expect(component.mensajeError).toBe('Por favor, completa correctamente todos los campos.');
    });

    it('should call userService.crearUsuario and navigate on successful registration', () => {
        const form = {invalid: false} as NgForm;

        component.aceptaTerminos = true;
        const mockResponse = { success: true };
        userServiceSpy.crearUsuario = jasmine.createSpy().and.returnValue(of(mockResponse));
        routerSpy.navigate = jasmine.createSpy();

        component.registrarse(form);

        expect(userServiceSpy.crearUsuario).toHaveBeenCalled();
        expect(component.error).toBeFalse();
        expect(component.mensajeError).toBe('Usuario creado correctamente.');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
    });

    it('should show error message if userService.crearUsuario fails', () => {
        const form = { invalid: false } as NgForm;
      
        component.aceptaTerminos = true;
      
        // Simular una respuesta con success: false
        userServiceSpy.crearUsuario = jasmine.createSpy().and.returnValue(of({ success: false }));
      
        component.registrarse(form);
      
        expect(component.error).toBeTrue();
        expect(component.mensajeError).toBe('Error al crear usuario.');
      });

    it('should initialize today with the current date', () => {
        const today = new Date().toISOString().split('T')[0];
        expect(component.today).toBe(today);
    });

});
