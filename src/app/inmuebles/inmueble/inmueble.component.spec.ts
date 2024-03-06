import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleComponent } from './inmueble.component';

describe('InmuebleComponent', () => {
  let component: InmuebleComponent;
  let fixture: ComponentFixture<InmuebleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InmuebleComponent]
    });
    fixture = TestBed.createComponent(InmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
