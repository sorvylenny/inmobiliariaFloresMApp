import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleDetailsComponent } from './inmueble-details.component';

describe('InmuebleDetailsComponent', () => {
  let component: InmuebleDetailsComponent;
  let fixture: ComponentFixture<InmuebleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InmuebleDetailsComponent]
    });
    fixture = TestBed.createComponent(InmuebleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
