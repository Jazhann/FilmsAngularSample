import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FilmsComponent } from './films.component';
import { FilmsService } from './services/films.service';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let store: MockStore;
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,  
        TranslateModule.forRoot() 
      ],
      declarations: [ FilmsComponent ],
      providers: [ 
        FilmsService,
        provideMockStore({ initialState }),
       ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
