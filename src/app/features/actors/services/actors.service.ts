import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Actor } from '../models/actor.model';

import { environment } from '@env/environment';
import { Constants } from '@shared/constants';


@Injectable()
export class ActorsService {

  constructor(
    private http: HttpClient
  ) { }

  getActors (): Observable<Actor []> {
    return this.http.get<Actor[]>(environment.apiUrl + Constants.ROUTE_API_ACTORS);
  }
}
