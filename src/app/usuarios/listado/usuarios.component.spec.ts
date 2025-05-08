import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosComponent } from './usuarios.component';
import { UserService } from '../../user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../interfaces/user';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const mockUsers: UserInterface[] = [
    {
      id: 1,
      nombre: 'PEPITO',
      nombreUsuario: 'pepito',
      status: true,
      createdAt: new Date(),
      username: 'pepito',
      name: 'PEPITO',
      email: 'pepito@example.com',
      password: '123456',
      fechaNacimiento: new Date('1990-01-01')
    },
    {
      id: 2,
      nombre: 'PEPITO EL GATO',
      nombreUsuario: 'pepitoGato',
      status: true,
      createdAt: new Date(),
      username: 'pepitoGato',
      name: 'PEPITO EL GATO',
      email: 'pepitoGato@example.com',
      password: '123456',
      fechaNacimiento: new Date('1992-02-02')
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['fetchUsersFromApi', 'getAllUsers', 'borrarUsuario']);

    await TestBed.configureTestingModule({
      imports: [UsuariosComponent, CommonModule],
      providers: [{ provide: UserService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchUsersFromApi on ngOnInit and update users', () => {
    userServiceSpy.fetchUsersFromApi.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(userServiceSpy.fetchUsersFromApi).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.isLoading).toBeFalse();
  });

  it('should call getAllUsers and update users', () => {
    userServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    component.getAllUsers();

    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should have isLoading true initially', () => {
    expect(component.isLoading).toBeTrue();
  });

  it('should call borrarUsuario and refresh user list on success', () => {
    spyOn(window, 'confirm').and.returnValue(true);
  
    const userId = 1;
    userServiceSpy.borrarUsuario.and.returnValue(of(true));
    userServiceSpy.fetchUsersFromApi.and.returnValue(of(mockUsers));
  
    component.onDeleteUser(userId);
  
    expect(userServiceSpy.borrarUsuario).toHaveBeenCalledWith({ id: userId });
    expect(userServiceSpy.fetchUsersFromApi).toHaveBeenCalled();
  });
  

  
});
