import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';

import { Film } from '../models/film.model';

import { environment } from '@env/environment';
import { Constants } from '@shared/constants';
import { filmMapped } from '../models/filmMapped.model';
import { Store } from '@ngrx/store';
import { AppState } from '@core/app.reducer';
import { Actor } from '@features/actors/models/actor.model';


@Injectable()
export class FilmsService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getFilms (): Observable<Film []> {
    return this.http.get<Film[]>(environment.apiUrl + Constants.ROUTE_API_FILMS);
  }

  getImage(image: string) {
    return image != null ? image : Constants.ROUTE_IMAGE_NOT_FOUND;
  }

  async mapData (film: Film): Promise<filmMapped> {
    const actors = await firstValueFrom(this.store.select(state => state.actors)
    .pipe(map(actors => 
      actors.reduce( (acc: Actor[], actor: Actor) => {
        const actorFind = actor.movies.find( movie => movie === film.id);
        if (actorFind) {
          acc.push(actor)
        }
        return acc
      },[]))
      )
    );
    const company = await firstValueFrom(this.store.select(state => state.companies)
    .pipe(map(companies => 
      companies.find( company => company.movies.includes(film.id))
      )
    ));
    return {...film, actors, company: company || undefined};
  }
}
