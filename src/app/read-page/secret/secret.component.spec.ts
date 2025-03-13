import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretComponent } from './secret.component';
import { setupGlobalProviders } from '../../../../test-setup';

describe('SecretComponent', () => {
  let component: SecretComponent;
  let fixture: ComponentFixture<SecretComponent>;

  beforeEach(async () => {
    setupGlobalProviders();
    await TestBed.configureTestingModule({
      imports: [SecretComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
