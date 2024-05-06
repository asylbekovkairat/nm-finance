import { Component } from '@angular/core';
import { TodosTableComponent } from '@components/todos-table/todos-table.component';

@Component({
  selector: 'app-fav-todos-list',
  standalone: true,
  imports: [TodosTableComponent],
  templateUrl: './fav-todos-list.component.html',
  styleUrl: './fav-todos-list.component.scss',
})
export class FavTodosListComponent {
  public readonly favTodosVM: any = {
    todos: [],
    tableTitle: 'favorite todos',
  };
}
