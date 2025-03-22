import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandboxedEmojiComponent } from './sandboxed-emoji.component';

describe('SandboxedEmojiComponent', () => {
  let component: SandboxedEmojiComponent;
  let fixture: ComponentFixture<SandboxedEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SandboxedEmojiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SandboxedEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
