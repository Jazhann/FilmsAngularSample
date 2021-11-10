import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Film } from '../models/film.model';

import { environment } from '@env/environment';
import { Constants } from '@shared/constants';


@Injectable()
export class FilmsService {

  constructor(
    private http: HttpClient
  ) { }

  getFilms (): Observable<Film []> {
    return this.http.get<Film[]>(environment.apiUrl + Constants.ROUTE_API_FILMS);
  }
}
