import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingMenuComponent } from './scrolling-menu.component';

describe('ScrollingMenuComponent', () => {
  let component: ScrollingMenuComponent;
  let fixture: ComponentFixture<ScrollingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollingMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
