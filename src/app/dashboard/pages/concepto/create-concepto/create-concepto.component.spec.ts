import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConceptoComponent } from './create-concepto.component';

describe('CreateConceptoComponent', () => {
  let component: CreateConceptoComponent;
  let fixture: ComponentFixture<CreateConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateConceptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
