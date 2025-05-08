import { TestBed } from '@angular/core/testing';
import { ForoService } from './foro.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('ForoService', () => {
  let service: ForoService;
  let httpMock: HttpTestingController;

  const mockTemas = [
    { id: 1, titulo: 'Tema 1', autor: 'Usuario 1' },
    { id: 2, titulo: 'Tema 2', autor: 'Usuario 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForoService]
    });
    service = TestBed.inject(ForoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch forum topics from API', () => {
    service.fetchForoFromApi().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockTemas);
    });

    const req = httpMock.expectOne(`${environment.apiForoUrl}/foro/temas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTemas);
  });
});
