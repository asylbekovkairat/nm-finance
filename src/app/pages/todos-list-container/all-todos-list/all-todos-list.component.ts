import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TodosTableComponent } from '@components/todos-table/todos-table.component';
import { TodoItem, TodoService } from 'app/services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-todos-list',
  standalone: true,
  imports: [TodosTableComponent, CommonModule],
  templateUrl: './all-todos-list.component.html',
  styleUrl: './all-todos-list.component.scss',
})
export class AllTodosListComponent {
  public readonly todosService = inject(TodoService);
  @Input({ required: true }) todos!: Observable<TodoItem[]>;

  constructor() {}
}
