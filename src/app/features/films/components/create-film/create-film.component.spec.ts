import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from '@features/films/services/films.service';
import { LayoutService } from '@shared/services/layout.service';

import { CreateFilmComponent } from './create-film.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import db from '@assets/data/db.json';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateFilmComponent', () => {
  let component: CreateFilmComponent;
  let fixture: ComponentFixture<CreateFilmComponent>;
  let store: MockStore;
  const initialState = { 
    films: db.films,
    actors: db.actors,
    companies: db.companies
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ CreateFilmComponent ],
      providers: [ 
        LayoutService,
        FilmsService,
        provideMockStore({ initialState }),
       ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get actor name', () => {
    const actor = {
      id: 2,
      first_name: 'Rory',
      last_name: 'Chanders',
      gender: 'Male',
      bornCity: 'Cijengkol',
      birthdate: '19/04/1975',
      img: 'http://dummyimage.com/600x400.png/5fa2dd/000000',
      rating: 2.43,
      movies: []
    };
    const actorName = component.getActorName(actor);
    expect(actorName).toEqual(actor.first_name + ' ' + actor.last_name);
  });

  it('should save film', () => {
    const company = {
      'id': 2,
      'name': 'Quitzon-Erdman',
      'country': 'China',
      'createYear': 2005,
      'employees': 611,
      'rating': 8.19,
      'movies': [2, 3, 4]
    };
    const actor = {
      id: 2,
      first_name: 'Rory',
      last_name: 'Chanders',
      gender: 'Male',
      bornCity: 'Cijengkol',
      birthdate: '19/04/1975',
      img: 'http://dummyimage.com/600x400.png/5fa2dd/000000',
      rating: 2.43,
      movies: []
    };
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.filmForm.patchValue({score: 10});
    component.filmForm.patchValue({title: 'title'});
    component.filmForm.patchValue({image: 'http:/mock.url'});
    component.filmForm.patchValue({length: 125});
    component.filmForm.patchValue({company});
    component.filmForm.patchValue({year: 2021});
    component.filmForm.removeControl('actor');
    component.filmForm.removeControl('genre');
    component.actors.push(actor);
    component.genres.push('Mock');
    component.saveFilm();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should not save film', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.saveFilm();
    expect(storeSpy).not.toHaveBeenCalled();
  });


  it('should add actor', () => {
    const actor = {
      id: 1,
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7]
    };
    component.filmForm.patchValue({actor});
    component.addActor();
    expect(component.filmForm.value.actor).toEqual('');
    expect(component.actors.length).toEqual(1);
  });

  it('should not add actor', () => {
    const actor = {
      id: 1,
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7]
    };
    component.filmForm.patchValue({actor});
    component.addActor();
    component.filmForm.patchValue({actor});
    component.addActor();
    expect(component.actors.length).toEqual(1);
  });


  it('should delete actor', () => {
    const actor = {
      id: 1,
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7]
    };
    component.filmForm.patchValue({actor});
    component.addActor();
    component.deleteActor(1);
    expect(component.actors.length).toEqual(0);
  });

  it('should add genre', () => {
    component.filmForm.patchValue({genre: 'Mock'});
    component.addGenre()
    expect(component.filmForm.value.genre).toEqual('');
    expect(component.genres.find(genre => genre === 'Mock')).toBeDefined();
  });

  it('should not add genre', () => {
    component.filmForm.patchValue({genre: 'Mock'});
    component.addGenre()
    component.filmForm.patchValue({genre: 'Mock'});
    component.addGenre()
    expect(component.genres.length).toEqual(1);
  });

  it('should delete genre', () => {
    component.filmForm.patchValue({genre: 'Mock'});
    component.addGenre()
    component.deleteGenre('Mock');
    expect(component.genres.length).toEqual(0);
    expect(component.genres.find(genre => genre === 'Mock')).toBeUndefined();
  });

});
