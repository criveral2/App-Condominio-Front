import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConceptoComponent } from './update-concepto.component';

describe('UpdateConceptoComponent', () => {
  let component: UpdateConceptoComponent;
  let fixture: ComponentFixture<UpdateConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateConceptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
