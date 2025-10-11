import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionUpdateComponent } from './seccion-update.component';

describe('SeccionUpdateComponent', () => {
  let component: SeccionUpdateComponent;
  let fixture: ComponentFixture<SeccionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeccionUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
