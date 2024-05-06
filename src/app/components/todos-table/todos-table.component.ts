import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todos-table',
  standalone: true,
  imports: [],
  templateUrl: './todos-table.component.html',
  styleUrl: './todos-table.component.scss',
})
export class TodosTableComponent {
  @Input({ required: true }) todosVM!: any;
}
