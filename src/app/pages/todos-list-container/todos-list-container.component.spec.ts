import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListContainerComponent } from './todos-list-container.component';

describe('TodosListContainerComponent', () => {
  let component: TodosListContainerComponent;
  let fixture: ComponentFixture<TodosListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosListContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
