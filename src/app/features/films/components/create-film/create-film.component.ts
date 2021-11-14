import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from '@core/app.reducer';
import * as actions from '../../store/actions/films.actions';
import * as companiesActions from '@features/companies/store/actions/companies.actions';
import * as actorsActions from '@features/actors/store/actions/actors.actions';

import { LayoutService } from '@shared/services/layout.service';
import { FilmsService } from '@features/films/services/films.service';

import { Actor } from '@features/actors/models/actor.model';
import { Company } from '@features/companies/models/company.model';
import { Film } from '@features/films/models/film.model';
import { Constants } from '@shared/constants';
import { validateArray } from '@shared/validators/validators';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent implements OnInit {
  CONST = Constants;
  actors: Actor[] = [];
  genres: string[] = [];
  actors$: Observable <Actor[]> = this.store.select(state => state.actors);
  companies$: Observable <Company[]> = this.store.select(state => state.companies);
  filmForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    score: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    actor: new FormControl('', validateArray(this.actors)),
    company: new FormControl('', Validators.required),
    genre: new FormControl('', validateArray(this.genres)),
    year: new FormControl('', Validators.required)
  });
  error = false;

  constructor(
    private filmsService: FilmsService,
    private layoutService: LayoutService,
    private location: Location,
    private store: Store<AppState>,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle(this.translate.instant(this.CONST.FILMS_CREATE_TITLE));
  }

  saveFilm() {
    if (this.filmForm.valid) {
      this.error = false;
      const film: Film = {
        id: ~~(Math.random() * 1010),
        title: this.filmForm.value.title,
        poster: this.isUrl(this.filmForm.value.image) ? this.filmForm.value.image : null,
        genre: this.genres,
        year: this.filmForm.value.year,
        duration: this.filmForm.value.length,
        imdbRating: this.filmForm.value.score,
        actors: this.actors.map(actor => actor.id)
      }
      this.store.dispatch(actions.createFilm({film}));
      this.store.dispatch(companiesActions.updateCompaniesFilms({filmId: film.id, newCompany: this.filmForm.value.company.id}))
      this.store.dispatch(actorsActions.updateActorsFilms({filmId: film.id, newActors: film.actors}));
      
      this.location.back();
    } else {
      this.error = true;
    }

  }

  getActorName(actor: Actor) {
    return this.filmsService.getActorName(actor);
  }

  
  addActor() {
    const actorToSave = this.filmForm.value.actor;
    if (!this.actors.some(actor => actor.id === actorToSave.id)) {
      this.actors.push(actorToSave);
    }
    this.filmForm.patchValue({actor: ''});
  }

  deleteActor(actorId: number) {
    this.actors = this.actors.filter(actor => actor.id !== actorId);
  }

  addGenre() {
    const genreToAdd = this.filmForm.value.genre;
    if (genreToAdd !== '' && !this.genres.some(genre => genre === genreToAdd)) {
      this.genres.push(genreToAdd);
      this.filmForm.patchValue({genre: ''});
    }
  }

  deleteGenre(genreToDelete: string) {
    this.genres = this.genres.filter(genre => genre !== genreToDelete);
  }

  private isUrl (string: string): boolean {
    try { 
      return Boolean(new URL(string)); 
    }
    catch(e){ 
      return false; 
    }
  }

}
