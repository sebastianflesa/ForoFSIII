import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ForoService {
    private apiForoUrl = environment.apiForoUrl;

    constructor(private readonly http: HttpClient) {

    }
    fetchForoFromApi(): Observable<any[]> {
        return this.http.get<any[]>(this.apiForoUrl.concat('/foro/temas'));
    }


}