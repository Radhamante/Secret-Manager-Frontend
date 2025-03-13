import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocComponent } from './doc.component';
import { setupGlobalProviders } from '../../../../test-setup';

describe('DocComponent', () => {
  let component: DocComponent;
  let fixture: ComponentFixture<DocComponent>;

  beforeEach(async () => {
    setupGlobalProviders();
    await TestBed.configureTestingModule({
      imports: [DocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
