import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '@shared/services/layout.service';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
       ],
      declarations: [ HeaderComponent ],
      providers: [ LayoutService ]
    })
    .compileComponents();
    layoutService = TestBed.inject(LayoutService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get title', () => {
    spyOn(layoutService, 'getTitle').and.returnValue(of('Titulo mock'));
    let title='';
    component.getTitle().subscribe(data => {
      title = data;
    })
    expect(title).toEqual('Titulo mock');
  });

  it('should get show menu button value', () => {
    spyOn(layoutService, 'showMenuButton').and.returnValue(true);
    let showMenu = component.showMenuButton();
    expect(showMenu).toBeTrue();
  });

  it('should get show back button value', () => {
    spyOn(layoutService, 'showBackButton').and.returnValue(true);
    let showBackButton = component.showBackButton();
    expect(showBackButton).toBeTrue();
  });

  it('should emit', () => {
    component.menuToggle.subscribe(data => {
      expect(data).toBeUndefined();
    })
    component.toggle();
  });

});
