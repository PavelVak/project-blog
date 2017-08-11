import { TestBed, inject } from '@angular/core/testing';

import { InventorService } from './inventory.service';

describe('InventorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventorService]
    });
  });

  it('should be created', inject([InventorService], (service: InventorService) => {
    expect(service).toBeTruthy();
  }));
});
