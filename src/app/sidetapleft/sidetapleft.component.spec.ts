import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetapleftComponent } from './sidetapleft.component';

describe('SidetapleftComponent', () => {
  let component: SidetapleftComponent;
  let fixture: ComponentFixture<SidetapleftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidetapleftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidetapleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
