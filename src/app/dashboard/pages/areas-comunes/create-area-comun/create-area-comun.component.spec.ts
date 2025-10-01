import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAreaComunComponent } from './create-area-comun.component';

describe('CreateAreaComunComponent', () => {
  let component: CreateAreaComunComponent;
  let fixture: ComponentFixture<CreateAreaComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAreaComunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAreaComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
