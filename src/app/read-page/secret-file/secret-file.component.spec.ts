import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretFileComponent } from './secret-file.component';

describe('SecretFileComponent', () => {
  let component: SecretFileComponent;
  let fixture: ComponentFixture<SecretFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
