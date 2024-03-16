import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDetailsInmuebleComponent } from './models-details-inmueble.component';

describe('ModelsDetailsInmuebleComponent', () => {
  let component: ModelsDetailsInmuebleComponent;
  let fixture: ComponentFixture<ModelsDetailsInmuebleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsDetailsInmuebleComponent]
    });
    fixture = TestBed.createComponent(ModelsDetailsInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
