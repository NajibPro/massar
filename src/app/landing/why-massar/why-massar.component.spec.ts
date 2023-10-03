import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMassarComponent } from './why-massar.component';

describe('WhyMassarComponent', () => {
  let component: WhyMassarComponent;
  let fixture: ComponentFixture<WhyMassarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhyMassarComponent]
    });
    fixture = TestBed.createComponent(WhyMassarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
