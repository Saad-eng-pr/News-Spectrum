import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionSectionComponent } from './instruction-section.component';

describe('InstructionSectionComponent', () => {
  let component: InstructionSectionComponent;
  let fixture: ComponentFixture<InstructionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
