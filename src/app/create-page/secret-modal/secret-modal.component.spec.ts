import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretModalComponent } from './secret-modal.component';

describe('SecretModalComponent', () => {
  let component: SecretModalComponent;
  let fixture: ComponentFixture<SecretModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
