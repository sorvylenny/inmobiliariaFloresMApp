import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsInmueblesComponent } from './models-inmuebles.component';

describe('ModelsInmueblesComponent', () => {
  let component: ModelsInmueblesComponent;
  let fixture: ComponentFixture<ModelsInmueblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsInmueblesComponent]
    });
    fixture = TestBed.createComponent(ModelsInmueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
