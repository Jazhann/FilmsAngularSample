import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutService } from '@shared/services/layout.service';
import { SpinnerService } from '@shared/services/spinner.service';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let store: MockStore;
  const initialState = { };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        TranslateModule.forRoot(),
       ],
      declarations: [ LayoutComponent ],
      providers: [ 
        LayoutService, 
        SpinnerService,
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
