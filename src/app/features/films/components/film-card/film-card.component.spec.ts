import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from '@features/films/services/films.service';

import { FilmCardComponent } from './film-card.component';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;
  let store: MockStore;
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ FilmCardComponent ],
      providers: [ 
        FilmsService,
        provideMockStore({ initialState }),
       ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.film = {
      "id": 3,
      "title": "Black Rain (Kuroi ame)",
      "poster": "http://dummyimage.com/400x600.png/5fa2dd/ffffff",
      "genre": ["Drama", "War"],
      "year": 2010,
      "duration": 175,
      "imdbRating": 6.25,
      "actors": [1]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
