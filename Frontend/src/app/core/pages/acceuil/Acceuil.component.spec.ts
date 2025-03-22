import { TestBed } from '@angular/core/testing';
import { AccueilComponent } from './Accueil.component';

describe('AcceuilComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent],
    }).compileComponents();
  });

  it('should create the Acceuil', () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    const Acceuil = fixture.componentInstance;
    expect(Acceuil).toBeTruthy();
  });

  it(`should have the 'NewsSpectrum' title`, () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    const Acceuil = fixture.componentInstance;
    expect(Acceuil.title).toEqual('NewsSpectrum');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AccueilComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, NewsSpectrum');
  });
});
