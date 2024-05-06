import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavTodosListComponent } from './fav-todos-list.component';

describe('FavTodosListComponent', () => {
  let component: FavTodosListComponent;
  let fixture: ComponentFixture<FavTodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavTodosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavTodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
