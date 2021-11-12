import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { firstValueFrom, map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@core/app.reducer';
import * as actions from '../../store/actions/films.actions';
import * as companiesActions from '@features/companies/store/actions/companies.actions';
import * as actorsActions from '@features/actors/store/actions/actors.actions';

import { LayoutService } from '@shared/services/layout.service';
import { FilmsService } from '@features/films/services/films.service';

import { filmMapped } from '@features/films/models/filmMapped.model';
import { Actor } from '@features/actors/models/actor.model';
import { Company } from '@features/companies/models/company.model';


@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
  filmMapped!: filmMapped;
  actors$: Observable <Actor[]> = this.store.select(state => state.actors);
  companies$: Observable <Company[]> = this.store.select(state => state.companies);
  disabled = true;
  filmForm = new FormGroup({
    score: new FormControl({ value: '', disabled: this.disabled }),
    length: new FormControl({ value: '', disabled: this.disabled }),
    actor: new FormControl({ value: '', disabled: this.disabled }),
    company: new FormControl({ value: '', disabled: this.disabled }),
    genre: new FormControl({ value: '', disabled: this.disabled })
  });
  filmCompanyId!: number;
  filmActors!: number[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    public filmsService: FilmsService,
    public layoutService: LayoutService,
  ) { }

  async ngOnInit() { 
    let id: number = await firstValueFrom(this.route.queryParams.pipe(map(params => params['id'])));
    const film = await firstValueFrom(this.store.select(state => state.films).pipe(map( films => films.find( film => film.id === +id))));
    if (film != null) {
      this.layoutService.setTitle(film.title + ' (' + film.year + ')' );
      this.filmMapped = await this.filmsService.mapData(film);
      this.filmCompanyId = this.filmMapped.company!.id;
      this.filmActors = [...film.actors];
      this.setFormValues();
    } else {
      this.router.navigate(['/']);
    }
  }
  
  setFormValues() {
    this.filmForm.patchValue({score: this.filmMapped.imdbRating});
    this.filmForm.patchValue({length: this.filmMapped.duration});
  }

  editFilm() {
    if (this.disabled) {
      Object.keys(this.filmForm.controls).forEach(key => {
        this.filmForm.get(key)?.enable();
      });
    } else {
      this.dispatchData();
      Object.keys(this.filmForm.controls).forEach(key => {
        this.filmForm.get(key)?.disable();
      });
    }
    this.disabled = !this.disabled;
  }

  dispatchData() {
    const film = {
      id: this.filmMapped.id,
      title: this.filmMapped.title,
      poster: this.filmMapped.poster,
      year: this.filmMapped.year,
      duration: this.filmForm.value.lenght,
      imdbRating: this.filmForm.value.score,
      actors: this.filmMapped.actors.map(actor => actor.id),
      genre: this.filmMapped.genre,
    };
    this.store.dispatch(actions.updateFilm({film}));
    if (this.filmCompanyId !== this.filmMapped.company?.id) {
      this.store.dispatch(companiesActions.updateCompaniesFilms({filmId: film.id, oldCompany: this.filmCompanyId, newCompany: this.filmMapped.company!.id}))
    }
    if (JSON.stringify(this.filmActors.sort()) !== JSON.stringify([...film.actors].sort())) {
      this.store.dispatch(actorsActions.updateActorsFilms({filmId: film.id, oldActors: this.filmActors, newActors: film.actors}));
    }
  }

  deleteFilm() {
    this.store.dispatch(actions.deleteFilm({filmId: this.filmMapped.id}));
    this.location.back();
  }

  addActor() {
    const actorToSave = this.filmForm.value.actor;
    if (!this.filmMapped.actors.some(actor => actor.id === actorToSave.id)) {
      this.filmMapped.actors.push(actorToSave);
    }
    this.filmForm.patchValue({actor: ''});
  }

  deleteActor(actorId: number) {
    this.filmMapped.actors = this.filmMapped.actors.filter(actor => actor.id !== actorId);
  }

  addGenre() {
    const genreToAdd = this.filmForm.value.genre;
    if (genreToAdd !== '' && !this.filmMapped.genre.some(genre => genre === genreToAdd)) {
      this.filmMapped.genre = this.filmMapped.genre.concat([genreToAdd]);
      this.filmForm.patchValue({genre: ''});
    }
  }

  deleteGenre(genreToDelete: string) {
    this.filmMapped.genre = this.filmMapped.genre.filter(genre => genre !== genreToDelete);
  }

  changeCompany(){
    this.filmMapped.company = this.filmForm.value.company;
    this.filmForm.patchValue({company: ''});
  }

}
