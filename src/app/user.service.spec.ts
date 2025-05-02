import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserInterface } from './interfaces/user';
import { environment } from '../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: UserInterface[] = [
    {
      id: 1,
      nombre: 'juan perez',
      nombreUsuario: 'juanp',
      status: true,
      createdAt: new Date(),
      username: 'juanp',
      name: 'Juan',
      email: 'juan@example.com',
      password: '123456',
      fechaNacimiento: new Date('1990-01-01')
    },
    {
      id: 2,
      nombre: 'pepito',
      nombreUsuario: 'pepito',
      status: true,
      createdAt: new Date(),
      username: 'pepito',
      name: 'pepito',
      email: 'pepito@example.com',
      password: '123456',
      fechaNacimiento: new Date('1992-02-02')
    }
  ];

  beforeEach(() => {
    localStorage.setItem('users', JSON.stringify(mockUsers));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('crea service', () => {
    expect(service).toBeTruthy();
  });

  it('get lista usuario api', () => {
    const response: UserInterface[] = [mockUsers[0]];

    service.fetchUsersFromApi().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].nombreUsuario).toBe('juanp');
    });

    const req = httpMock.expectOne(`${environment.apiUsersUrl}/usuarios/lista`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('retorna usuario con nombre de usuario y contraseña', (done) => {
    service.getUserByUsernamePassword('juanp', '123456').subscribe(user => {
      expect(user).toBeTruthy();
      expect(user!.nombre).toBe('juan perez');
      done();
    });
  });

  it('retorna null si usuario es null', (done) => {
    service.getUserByUsernamePassword('invalido', 'mal').subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('obtiene todos los usuarios', (done) => {
    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[1].nombre).toBe('pepito');
      done();
    });
  });

  it('obtiene profile con id', (done) => {
    service.getPerfilUser(1).subscribe(user => {
      expect(user?.username).toBe('juanp');
      done();
    });
  });

  it('retorna null si usuario no existe', (done) => {
    service.getPerfilUser(999).subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('crea usuario y asigna id', (done) => {
    const newUser: UserInterface = {
      id: 0,
      nombre: 'Nuevo Usuario',
      nombreUsuario: 'nuevo',
      status: true,
      createdAt: new Date(),
      username: 'nuevo',
      name: 'Nuevo',
      email: 'nuevo@example.com',
      password: 'pass',
      fechaNacimiento: new Date('2000-01-01')
    };

    service.saveUser(newUser).subscribe(saved => {
      expect(saved.id).toBeGreaterThan(2);
      expect(saved.nombreUsuario).toBe('nuevo');
      done();
    });
  });

  it('actualiza usuario', (done) => {
    const updatedUser: UserInterface = { ...mockUsers[0], name: 'pepito mod' };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user?.name).toBe('pepito mod');
      done();
    });
  });

  it('retorna null si usuario a actualizar no existe', (done) => {
    const updatedUser: UserInterface = { ...mockUsers[0], id: 999 };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('debe obtener usuario', (done) => {
    service.getPerfilUser(2).subscribe();
    service.getCurrentUser().subscribe(current => {
      expect(current?.nombre).toBe('pepito');
      done();
    });
  });

  it('actualiza usuario en la api', () => {
    const user: UserInterface = { ...mockUsers[0], name: 'API Update' };

    service.updateUserApi(user).subscribe(res => {
      expect(res.name).toBe('API Update');
    });

    const req = httpMock.expectOne(`${environment.apiUsersUrl}/usuarios/actualizar`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush(user);
  });
});
