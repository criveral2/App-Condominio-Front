import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasComunesComponent } from './areas-comunes.component';

describe('AreasComunesComponent', () => {
  let component: AreasComunesComponent;
  let fixture: ComponentFixture<AreasComunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasComunesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasComunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
