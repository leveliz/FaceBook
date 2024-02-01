import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetaprightComponent } from './sidetapright.component';

describe('SidetaprightComponent', () => {
  let component: SidetaprightComponent;
  let fixture: ComponentFixture<SidetaprightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidetaprightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidetaprightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
