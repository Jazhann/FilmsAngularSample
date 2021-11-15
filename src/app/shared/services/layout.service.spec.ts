import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: Router, useValue: { url: '/films/edit' }
        }
      ]
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title', () => {
    let title = '';
    service.headerTitle$.subscribe(data => {
      title = data;
    })
    service.setTitle('Titulo Mock');
    expect(title).toEqual('Titulo Mock');
  });

  it('should get title', () => {
    let title = '';
    service.getTitle().subscribe(data => {
      title = data;
    })
    service.setTitle('Titulo Mock');
    expect(title).toEqual('Titulo Mock');
  });

  it('should return true show back button', () => {
    expect(service.showBackButton()).toBeTrue();
  });

  it('should return false show menu button', () => {
    expect(service.showMenuButton()).toBeFalse();
  });


});
