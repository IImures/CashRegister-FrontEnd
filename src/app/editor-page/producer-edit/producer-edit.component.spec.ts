import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerEditComponent } from './producer-edit.component';

describe('ProducerEditComponent', () => {
  let component: ProducerEditComponent;
  let fixture: ComponentFixture<ProducerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
