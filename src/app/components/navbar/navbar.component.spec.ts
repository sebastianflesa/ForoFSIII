import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['logout']);
    const userServiceMock = jasmine.createSpyObj('UserService', ['getUser']); // 👈 Agrega al menos 1 método

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, CommonModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAdmin to true if user role is admin', () => {
    const adminUser = {
      data: {
        rol: { nombreRol: 'admin' }
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(adminUser));
    component.ngOnInit();
    expect(component.isAdmin).toBeTrue();
  });

  it('should set isAdmin to false if user role is not admin', () => {
    const normalUser = {
      data: {
        rol: { nombreRol: 'user' }
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(normalUser));
    component.ngOnInit();
    expect(component.isAdmin).toBeFalse();
  });

  it('should call authService.logout on logout()', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
