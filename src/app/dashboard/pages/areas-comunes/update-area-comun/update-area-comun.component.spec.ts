import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAreaComunComponent } from './update-area-comun.component';

describe('UpdateAreaComunComponent', () => {
  let component: UpdateAreaComunComponent;
  let fixture: ComponentFixture<UpdateAreaComunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAreaComunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAreaComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
