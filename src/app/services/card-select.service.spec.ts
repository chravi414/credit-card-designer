import { TestBed } from '@angular/core/testing';

import { CardSelectService } from './card-select.service';

describe('CardSelectService', () => {
  let service: CardSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
