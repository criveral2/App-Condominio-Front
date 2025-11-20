import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContratosComponent } from './create-contratos.component';

describe('CreateContratosComponent', () => {
  let component: CreateContratosComponent;
  let fixture: ComponentFixture<CreateContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContratosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
