import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from '@features/films/services/films.service';
import { LayoutService } from '@shared/services/layout.service';

import { EditFilmComponent } from './edit-film.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import db from '@assets/data/db.json';

describe('EditFilmComponent', () => {
  let component: EditFilmComponent;
  let fixture: ComponentFixture<EditFilmComponent>;
  let store: MockStore;
  const initialState = { 
    films: db.films,
    actors: db.actors,
    companies: db.companies
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
       ], 
      declarations: [ EditFilmComponent ],
      providers: [ 
        LayoutService,
        FilmsService,
        provideMockStore({ initialState }),
        {
           provide: ActivatedRoute, useValue: { 
              queryParams: of({id: 1}) 
            }
        }
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFilmComponent);
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
    }
    const actorName = component.getActorName(actor);
    expect(actorName).toEqual(actor.first_name + ' ' + actor.last_name);
  });

  it('should get image url', () => {
    const mockUrl = 'http:/mock.image.url';
    const url = component.getImage(mockUrl);
    expect(url).toEqual(mockUrl);
  });

  it('should edit film', async () => {
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
    const company = {
      'id': 2,
      'name': 'Quitzon-Erdman',
      'country': 'China',
      'createYear': 2005,
      'employees': 611,
      'rating': 8.19,
      'movies': [2, 3, 4]
    };
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    await component.ngOnInit();
    component.filmForm.patchValue({actor});
    component.addActor()
    component.filmForm.patchValue({score: 10});
    component.filmMapped.company = company;
    component.editFilm();
    component.editFilm();
    expect(storeSpy).toHaveBeenCalledTimes(3);
  });

  it('should not edit film', async () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    await component.ngOnInit();
    component.filmForm.patchValue({score: undefined});
    component.editFilm();
    component.editFilm();
    expect(storeSpy).not.toHaveBeenCalled();
  });

  it('should not load page', async () => {
    store.setState({
      films: []
    });
    await component.ngOnInit();
    expect(component.filmMapped).toBeUndefined();
  });

  it('should delete film', async () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    await component.ngOnInit();
    component.deleteFilm();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should add actor', async () => {
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
    await component.ngOnInit();
    component.filmForm.patchValue({actor});
    component.addActor()
    expect(component.filmForm.value.actor).toEqual('');
    expect(component.filmMapped.actors.length).toEqual(4);
  });

  it('should not add actor', async () => {
    const actor = {
      id: 4,
      first_name: 'Isaak',
      last_name: 'McQuode',
      gender: 'Male',
      bornCity: 'Ciduren',
      birthdate: '24/12/1957',
      img: 'http://dummyimage.com/600x400.png/dddddd/000000',
      rating: 2.03,
      movies: [3, 7]
    };
    await component.ngOnInit();
    component.filmForm.patchValue({actor});
    component.addActor()
    expect(component.filmForm.value.actor).toEqual('');
    expect(component.filmMapped.actors.length).toEqual(3);
  });

  it('should delete actor', async () => {
    await component.ngOnInit();
    component.deleteActor(4);
    expect(component.filmMapped.actors.length).toEqual(2);
  });

  it('should add genre', async () => {
    await component.ngOnInit();
    component.filmForm.patchValue({genre: 'Mock'});
    component.addGenre();
    expect(component.filmForm.value.genre).toEqual('');
    expect(component.filmMapped.genre.find(genre => genre === 'Mock')).toBeDefined();
  });

  it('should not add genre', async () => {
    await component.ngOnInit();
    component.filmForm.patchValue({genre: 'Comedy'});
    component.addGenre();
    expect(component.filmMapped.genre.length).toEqual(3);
  });

  it('should delete genre', async () => {
    await component.ngOnInit();
    component.deleteGenre('Comedy');
    expect(component.filmMapped.genre.length).toEqual(2);
    expect(component.filmMapped.genre.find(genre => genre === 'Comedy')).toBeUndefined();
  });

  it('should modify company', async () => {
    const company = {
      'id': 2,
      'name': 'Quitzon-Erdman',
      'country': 'China',
      'createYear': 2005,
      'employees': 611,
      'rating': 8.19,
      'movies': [2, 3, 4]
    };
    await component.ngOnInit();
    component.filmForm.patchValue({company});
    component.changeCompany();
    expect(component.filmForm.value.company).toEqual('');
    expect(component.filmMapped.company?.id).toEqual(2);
  });


});
