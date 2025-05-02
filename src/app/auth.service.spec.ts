import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from '../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const userServiceStub = {}; 

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceStub }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('creacion componente', () => {
    expect(service).toBeTruthy();
  });

  it('login correcto almacena data usuario en localstorage', (done) => {
    const mockResponse = { success: true, user: { id: 1, nombre: 'sebastian' } };

    service.login('admin', '123456').subscribe(result => {
      expect(result).toBeTrue();
      expect(localStorage.getItem('user')).toContain('sebastian');
      expect(localStorage.getItem('isLoggedIn')).toBe('true');
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUsersUrl}/usuarios/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ nombreUsuario: 'admin', contraseña: '123456' });

    req.flush(mockResponse);
  });

  it('error login retorna error', (done) => {
    const mockResponse = { success: false };

    service.login('error@example.com', 'asdasd').subscribe(result => {
      expect(result).toBeFalse();
      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('isLoggedIn')).toBeNull();
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUsersUrl}/usuarios/login`);
    req.flush(mockResponse);
  });

  it('crea data usuario y hace logout', () => {
    localStorage.setItem('isLoggedIn', 'true');

    service.logout();

    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('true si usuario ya esta logueado', () => {
    localStorage.setItem('isLoggedIn', 'true');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('false si usuario no esta logueado', () => {
    expect(service.isLoggedIn()).toBeFalse();
    localStorage.setItem('isLoggedIn', 'false');
    expect(service.isLoggedIn()).toBeFalse();
  });
});
