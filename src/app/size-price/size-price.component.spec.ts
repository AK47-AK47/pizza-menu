import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizePriceComponent } from './size-price.component';

describe('SizePriceComponent', () => {
  let component: SizePriceComponent;
  let fixture: ComponentFixture<SizePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SizePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
