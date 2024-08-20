import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditHomeComponent } from './item-edit-home.component';

describe('ItemEditHomeComponent', () => {
  let component: ItemEditHomeComponent;
  let fixture: ComponentFixture<ItemEditHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEditHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
