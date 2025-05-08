import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ForoService } from '../foro.service';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

interface Tema {
  id: number;
  titulo: string;
  contenido: string;
  publicado: number | null;
  fechaCreacion: string;
  usuarioId: number;
  categoriaId: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  temas: Tema[] = [];
  loading = true;
  error: string | null = null;

  constructor(private readonly auth: AuthService, private readonly foroService: ForoService) {}
  ngOnInit() {
    this.foroService.fetchForoFromApi()
      .pipe(
        catchError(err => {
          this.error = 'Error al cargar temas desde la API.';
          console.error(err);
          return of({ success: false, data: [] });
        }),
        finalize(() => this.loading = false)
      )
      .subscribe((res: any) => {
        if (res.success && res.data) {
          this.temas = res.data.filter((tema: Tema) => tema.publicado === 1);
        } else if (!this.error) {
          this.error = res.message || 'Error inesperado.';
        }
      });
  }

  logout(): void {
    this.auth.logout();
  }
}
