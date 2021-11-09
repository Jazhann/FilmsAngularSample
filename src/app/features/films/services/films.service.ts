import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';

@Injectable()
export class FilmsService {

  constructor(
    private http: HttpClient
  ) { }

  getFilms (): Observable<Film []> {
    return this.http.get<Film[]>('http://localhost:3000/films');
  }
}
