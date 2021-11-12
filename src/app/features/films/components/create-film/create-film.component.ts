import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from '@core/app.reducer';
import { Actor } from '@features/actors/models/actor.model';
import { Company } from '@features/companies/models/company.model';
import { Film } from '@features/films/models/film.model';
import { FilmsService } from '@features/films/services/films.service';
import { Store } from '@ngrx/store';
import { LayoutService } from '@shared/services/layout.service';
import { Observable } from 'rxjs';
import * as actions from '../../store/actions/films.actions';

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.scss']
})
export class CreateFilmComponent implements OnInit {
  actors: Actor[] = [];
  genres: string[] = [];
  actors$: Observable <Actor[]> = this.store.select(state => state.actors);
  companies$: Observable <Company[]> = this.store.select(state => state.companies);
  filmForm = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    score: new FormControl(''),
    length: new FormControl(''),
    actor: new FormControl(''),
    company: new FormControl(''),
    genre: new FormControl(''),
    year: new FormControl('')
  });

  constructor(
    private store: Store<AppState>,
    public filmsService: FilmsService,
    private layoutService: LayoutService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.layoutService.setTitle('Nueva Pelicula');
  }

  saveFilm() {
    const film: Film = {
      id: Math.random() * 1010,
      title: this.filmForm.get('title')?.value,
      poster: this.filmForm.get('image')?.value,
      genre: this.genres,
      year: this.filmForm.get('year')?.value,
      duration: this.filmForm.get('lenght')?.value,
      imdbRating: this.filmForm.get('score')?.value,
      actors: this.actors.map(actor => actor.id)
    }
    this.store.dispatch(actions.createFilm({film}));
    this.location.back();
  }

  
  addActor() {
    const actorToSave = this.filmForm.get('actor')?.value;
    if (!this.actors.some(actor => actor.id === actorToSave.id)) {
      this.actors.push(actorToSave);
    }
    this.filmForm.patchValue({actor: ''});
  }

  deleteActor(actorId: number) {
    this.actors = this.actors.filter(actor => actor.id !== actorId);
  }

  addGenre() {
    const genreToAdd = this.filmForm.get('genre')?.value;
    if (genreToAdd !== '' && !this.genres.some(genre => genre === genreToAdd)) {
      this.genres.push(genreToAdd);
      this.filmForm.patchValue({genre: ''});
    }
  }

  deleteGenre(genreToDelete: string) {
    this.genres = this.genres.filter(genre => genre !== genreToDelete);
  }

}
