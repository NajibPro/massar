import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingCareersComponent } from './building-careers.component';

describe('BuildingCareersComponent', () => {
  let component: BuildingCareersComponent;
  let fixture: ComponentFixture<BuildingCareersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingCareersComponent]
    });
    fixture = TestBed.createComponent(BuildingCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
