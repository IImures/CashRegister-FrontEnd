import { TestBed } from '@angular/core/testing';

import { SubCatalogService } from './sub-catalog.service';

describe('SubCatalogService', () => {
  let service: SubCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
