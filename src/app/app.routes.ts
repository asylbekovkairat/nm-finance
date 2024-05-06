import { Routes } from '@angular/router';
import { TodosListContainerComponent } from './pages/todos-list-container/todos-list-container.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';

export const routes: Routes = [
  { path: 'list', component: TodosListContainerComponent },
  { path: 'favorite', component: TodosListContainerComponent },
  { path: 'add', component: CreateTodoComponent },
];
