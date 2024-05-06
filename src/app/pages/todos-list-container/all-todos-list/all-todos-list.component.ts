import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosTableComponent } from '@components/todos-table/todos-table.component';

@Component({
  selector: 'app-all-todos-list',
  standalone: true,
  imports: [TodosTableComponent],
  templateUrl: './all-todos-list.component.html',
  styleUrl: './all-todos-list.component.scss',
})
export class AllTodosListComponent {
  public readonly todayTodosVM: any = {
    todos: [],
    tableTitle: 'Today todos',
  };

  public readonly allTodosVM: any = {
    todos: [],
    tableTitle: 'All todos',
  };

  constructor() {}
}
