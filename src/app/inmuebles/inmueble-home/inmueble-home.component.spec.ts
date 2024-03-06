import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleHomeComponent } from './inmueble-home.component';

describe('InmuebleHomeComponent', () => {
  let component: InmuebleHomeComponent;
  let fixture: ComponentFixture<InmuebleHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InmuebleHomeComponent]
    });
    fixture = TestBed.createComponent(InmuebleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
