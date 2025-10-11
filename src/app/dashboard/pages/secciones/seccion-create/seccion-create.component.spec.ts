import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionCreateComponent } from './seccion-create.component';

describe('SeccionCreateComponent', () => {
  let component: SeccionCreateComponent;
  let fixture: ComponentFixture<SeccionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeccionCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
