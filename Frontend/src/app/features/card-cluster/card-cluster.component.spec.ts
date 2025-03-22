import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClusterComponent } from './card-cluster.component';

describe('CardClusterComponent', () => {
  let component: CardClusterComponent;
  let fixture: ComponentFixture<CardClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardClusterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
