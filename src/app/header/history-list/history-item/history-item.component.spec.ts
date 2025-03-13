import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryItemComponent } from './history-item.component';
import { setupGlobalProviders } from '../../../../../test-setup';
import { Secret } from '../../../models/secret.model';
import { SecretType } from '../../../models/secret-type.enum';
describe('HistoryItemComponent', () => {
  let component: HistoryItemComponent;
  let fixture: ComponentFixture<HistoryItemComponent>;

  beforeEach(async () => {
    setupGlobalProviders();
    await TestBed.configureTestingModule({
      imports: [HistoryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryItemComponent);
    component = fixture.componentInstance;
    component.secret = new Secret(
      crypto.randomUUID(),
      new Date(),
      new Date(),
      1,
      1,
      SecretType.FILE
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
