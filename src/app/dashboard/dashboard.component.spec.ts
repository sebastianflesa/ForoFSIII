import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { ForoService } from '../foro.service';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let foroServiceMock: any;
  let authServiceMock: any;

  const mockData = {
    success: true,
    message: 'Temas listados con éxito',
    data: [
      { id: 1, titulo: 'Tema A', contenido: '...', publicado: 1, fechaCreacion: '2025-01-01', usuarioId: 1, categoriaId: 1 },
      { id: 2, titulo: 'Tema B', contenido: '...', publicado: 0, fechaCreacion: '2025-01-02', usuarioId: 2, categoriaId: 1 }
    ]
  };

  beforeEach(async () => {
    foroServiceMock = { fetchForoFromApi: jasmine.createSpy() };
    authServiceMock = { logout: jasmine.createSpy() };

    await TestBed.configureTestingModule({
      imports: [CommonModule, DashboardComponent],
      providers: [
        { provide: ForoService, useValue: foroServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('debe cargar solo temas publicados', () => {
    foroServiceMock.fetchForoFromApi.and.returnValue(of(mockData));
    fixture.detectChanges();

    expect(component.temas.length).toBe(1);
    expect(component.temas[0].titulo).toBe('Tema A');
  });

  it('debe manejar errores de la API', () => {
    foroServiceMock.fetchForoFromApi.and.returnValue(throwError(() => new Error('Error API')));
    fixture.detectChanges();

    expect(component.error).toBe('Error al cargar temas desde la API.');
    expect(component.temas.length).toBe(0);
  });

 
});
