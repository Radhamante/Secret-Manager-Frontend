import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretModalComponent } from './secret-modal.component';
import { setupGlobalProviders } from '../../../../test-setup';
import { Secret } from '../../models/secret.model';
import { ReplaySubject } from 'rxjs';
import { SecretType } from '../../models/secret-type.enum';

describe('SecretModalComponent', () => {
  let component: SecretModalComponent;
  let fixture: ComponentFixture<SecretModalComponent>;

  beforeEach(async () => {
    setupGlobalProviders();
    await TestBed.configureTestingModule({
      imports: [SecretModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecretModalComponent);
    component = fixture.componentInstance;

    // Définir les valeurs pour les inputs
    component.$secret = new ReplaySubject<Secret>(1);
    component.$secret.next(
      new Secret('uuid', new Date(), new Date(), 1, 1, SecretType.TEXT)
    );
    component.isOpen = true;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
