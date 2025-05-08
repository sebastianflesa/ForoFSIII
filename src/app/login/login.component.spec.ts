import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../app.routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: AuthService, useValue: authMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('crea componente', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('redirect logueado', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  */

  /*
  it('no redirect si esta logueado', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
  */

  /*
  it('login ok redirige al dashboard', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of(true));
    component.username = 'admin';
    component.password = '123456';
    component.login();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith('admin', '123456');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.error).toBeFalse();
  }));
  */

  it('login fallido muestra error', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of(false));
    component.username = 'asdasd';
    component.password = 'asdasd';
    component.login();
    tick();

    expect(component.error).toBeTrue();
  }));


  it('muestra alerta si error es true', () => {
    component.error = true;
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert).toBeTruthy();
    expect(alert.textContent).toContain('Usuario o contraseña inválidos');
  });

  it('oculta alerta si error es false', () => {
    component.error = false;
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert).toBeFalsy();
  });

  it('simula click en boton de login', () => {
    spyOn(component, 'login');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.login).toHaveBeenCalled();
  });
});