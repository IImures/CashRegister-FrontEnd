import { TestBed } from '@angular/core/testing';

import { SidebarHeaderService } from './sidebar-header.service';

describe('SidebarHeaderService', () => {
  let service: SidebarHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
