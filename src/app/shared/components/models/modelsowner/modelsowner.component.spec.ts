import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsownerComponent } from './modelsowner.component';

describe('ModelsownerComponent', () => {
  let component: ModelsownerComponent;
  let fixture: ComponentFixture<ModelsownerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsownerComponent]
    });
    fixture = TestBed.createComponent(ModelsownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
