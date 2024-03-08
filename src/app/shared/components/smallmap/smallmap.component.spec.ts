import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallmapComponent } from './smallmap.component';

describe('SmallmapComponent', () => {
  let component: SmallmapComponent;
  let fixture: ComponentFixture<SmallmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallmapComponent]
    });
    fixture = TestBed.createComponent(SmallmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
