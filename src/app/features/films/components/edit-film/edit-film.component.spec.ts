import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsService } from '@features/films/services/films.service';
import { LayoutService } from '@shared/services/layout.service';

import { EditFilmComponent } from './edit-film.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditFilmComponent', () => {
  let component: EditFilmComponent;
  let fixture: ComponentFixture<EditFilmComponent>;
  let store: MockStore;
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule
       ], 
      declarations: [ EditFilmComponent ],
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
    fixture = TestBed.createComponent(EditFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
