import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalConfigurationComponent } from './personal-configuration.component';

describe('PersonalConfigurationComponent', () => {
  let component: PersonalConfigurationComponent;
  let fixture: ComponentFixture<PersonalConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
