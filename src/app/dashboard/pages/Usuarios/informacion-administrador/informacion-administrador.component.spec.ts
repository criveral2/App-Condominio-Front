import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAdministradorComponent } from './informacion-administrador.component';

describe('InformacionAdministradorComponent', () => {
  let component: InformacionAdministradorComponent;
  let fixture: ComponentFixture<InformacionAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
