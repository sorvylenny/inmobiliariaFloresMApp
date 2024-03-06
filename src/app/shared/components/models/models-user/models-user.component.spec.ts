import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsUserComponent } from './models-user.component';

describe('ModelsUserComponent', () => {
  let component: ModelsUserComponent;
  let fixture: ComponentFixture<ModelsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelsUserComponent]
    });
    fixture = TestBed.createComponent(ModelsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
