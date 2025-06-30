import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlNameSelectorComponent } from './bowl-name-selector.component';

describe('BowlNameSelectorComponent', () => {
  let component: BowlNameSelectorComponent;
  let fixture: ComponentFixture<BowlNameSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowlNameSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlNameSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
