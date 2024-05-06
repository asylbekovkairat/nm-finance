import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AllTodosListComponent } from './all-todos-list/all-todos-list.component';
import { FavTodosListComponent } from './fav-todos-list/fav-todos-list.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { TodoService } from 'app/services/todos.service';

@Component({
  selector: 'app-todos-list-container',
  standalone: true,
  imports: [
    AllTodosListComponent,
    FavTodosListComponent,
    NgSwitch,
    NgSwitchCase,
  ],
  templateUrl: './todos-list-container.component.html',
  styleUrl: './todos-list-container.component.scss',
})
export class TodosListContainerComponent {
  private readonly router = inject(Router);
  private readonly todosService = inject(TodoService);
  public readonly todosType!: string;

  constructor() {
    this.todosType = this.router.url;
    this.todosService.getTodos();
  }
}
