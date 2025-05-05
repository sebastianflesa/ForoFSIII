import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearComponent } from './crear.component';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('CrearComponent', () => {
  let component: CrearComponent;
  let fixture: ComponentFixture<CrearComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['saveUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CrearComponent, CommonModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saveUser and navigate on valid form submission', () => {
    const formMock = {
      invalid: false,
      controls: {}
    } as unknown as NgForm;

    spyOn(window, 'alert');
    userServiceSpy.saveUser.and.returnValue(of({
      id: 1,
      nombre: 'Test User',
      nombreUsuario: 'testuser',
      status: true,
      createdAt: new Date(),
      username: 'testuser',
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      fechaNacimiento: new Date('2000-01-01')
    }));

    component.onSubmit(formMock);

    expect(userServiceSpy.saveUser).toHaveBeenCalledWith(component.user);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/usuarios']);
    expect(window.alert).toHaveBeenCalledWith('Usuario creado correctamente');
  });

  it('should mark form controls as touched on invalid form', () => {
    const mockControl = { markAsTouched: jasmine.createSpy('markAsTouched') };
    const formMock = {
      invalid: true,
      controls: {
        username: mockControl,
        email: mockControl
      }
    } as unknown as NgForm;

    component.onSubmit(formMock);

    expect(mockControl.markAsTouched).toHaveBeenCalledTimes(2);
  });
});
