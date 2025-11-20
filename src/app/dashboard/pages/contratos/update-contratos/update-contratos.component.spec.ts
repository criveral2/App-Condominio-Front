import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContratosComponent } from './update-contratos.component';

describe('UpdateContratosComponent', () => {
  let component: UpdateContratosComponent;
  let fixture: ComponentFixture<UpdateContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateContratosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
