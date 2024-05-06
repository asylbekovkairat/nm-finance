import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTodosListComponent } from './all-todos-list.component';

describe('AllTodosListComponent', () => {
  let component: AllTodosListComponent;
  let fixture: ComponentFixture<AllTodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTodosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
