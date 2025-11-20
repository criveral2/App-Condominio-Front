import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropiedadesComponent } from './update-propiedades.component';

describe('UpdatePropiedadesComponent', () => {
  let component: UpdatePropiedadesComponent;
  let fixture: ComponentFixture<UpdatePropiedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePropiedadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
