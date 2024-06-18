import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AllTodosListComponent } from './all-todos-list/all-todos-list.component';
import { FavTodosListComponent } from './fav-todos-list/fav-todos-list.component';
import { AsyncPipe, NgSwitch, NgSwitchCase, CommonModule } from '@angular/common';
import { TodoService } from 'app/services/todos.service';

@Component({
  selector: 'app-todos-list-container',
  standalone: true,
  imports: [
    AllTodosListComponent,
    FavTodosListComponent,
    NgSwitch,
    AsyncPipe,
    NgSwitchCase,
    CommonModule
  ],
  templateUrl: './todos-list-container.component.html',
  styleUrl: './todos-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListContainerComponent {
  private readonly router = inject(Router);
  public readonly todosType!: string;
  private readonly todosService = inject(TodoService);

  public readonly todos$ = this.todosService.todos$;

  constructor() {
    this.todosType = this.router.url;
  }
}
