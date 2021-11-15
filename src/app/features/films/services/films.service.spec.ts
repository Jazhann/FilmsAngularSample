import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from './films.service';
import db from '@assets/data/db.json';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@shared/constants';

describe('FilmsService', () => {
  let service: FilmsService;
  let store: MockStore;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const initialState = { 
    films: db.films,
    actors: db.actors,
    companies: db.companies
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        FilmsService,
        provideMockStore({ initialState }),
       ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FilmsService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get image url', () => {
    const mockUrl = 'http:/mock.image.url';
    const url = service.getImage(mockUrl);
    expect(url).toEqual(mockUrl);
  });

  it('should get default image url', () => {
    const mockUrl = undefined;
    const url = service.getImage(mockUrl);
    expect(url).toEqual(Constants.ROUTE_IMAGE_NOT_FOUND);
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
    const actorName = service.getActorName(actor);
    expect(actorName).toEqual(actor.first_name + ' ' + actor.last_name);
  });

  it('should map data and return filmmapped', async () => {
    const film = {
      id: 6,
      title: 'V/H/S: Viral',
      poster: 'http://dummyimage.com/400x600.png/dddddd/000000',
      genre: ['Horror', 'Thriller'],
      year: 1995,
      duration: 239,
      imdbRating: 6.99,
      actors: [3, 4, 5]
    };
    const filmMapped = await service.mapData(film);
    expect(filmMapped.company).toBeDefined();
    expect(filmMapped.actors[0]).toBeInstanceOf(Object);
  });

  it('should get films', async () => {
    let films = [];
    service.getFilms().subscribe(data => {
      films = data;
    });
    const req = httpTestingController.expectOne(db.films);
    expect(req.request.method).toEqual('GET');
    req.flush(db.films); 
    expect(films.length).toBeGreaterThan(0);
  });

});
