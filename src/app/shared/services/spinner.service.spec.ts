import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change show value true', () => {
    let showValue = false;
    service.spinner$.subscribe(data => {
      showValue = data;
    })
    service.hide();
    expect(showValue).toBeTrue();
  });

  it('should change show value false', () => {
    let showValue = false;
    service.spinner$.subscribe(data => {
      showValue = data;
    })
    service.show();
    expect(showValue).toBeFalse();
  });

  it('shoud get show value', () => {
    let showValue = true;
    service.status().subscribe(data => {
      showValue = data;
    })
    service.show();
    expect(showValue).toBeFalse();
  });


});
