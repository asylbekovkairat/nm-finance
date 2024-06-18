import { Injectable, inject } from '@angular/core';
import { JSONSchema } from '@ngx-pwa/local-storage';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  map,
  of,
  tap,
} from 'rxjs';
import { AsyncLocalStorageService } from './localStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface TodoItem {
  id: number;
  title: string;
  createdAt: number;
  expireDate: number;
  expireTime?: string;
  isFavorite: boolean;
  done: boolean;
}

const todoItemSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      createdAt: { type: 'number' },
      expireDate: { type: 'number' },
      expireTime: { type: 'string' },
      isFavorite: { type: 'boolean' },
      done: { type: 'boolean' },
    },
    required: ['id', 'title', 'createdAt', 'expireDate', 'isFavorite'],
  },
} satisfies JSONSchema;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storage = inject(AsyncLocalStorageService);
  private readonly todosSubject$ = new BehaviorSubject<TodoItem[]>([]);
  public readonly todos$ = this.todosSubject$.asObservable();

  constructor() {
    this.loadTodos();
    // this.storage.clear();
    // this.storage.clear().subscribe(() => {});
  }

  public delete(id: number): void {
    const updatedTodos = this.todosSubject$.value.filter(
      (item) => item.id === id
    );

    this.storage.setItem('todos', updatedTodos);
  }

  public loadTodos(): void {
    this.storage
      .getItem<TodoItem[]>('todos', todoItemSchema)
      .pipe(delay(500))
      .subscribe({
        next: (todos) => {
          if (Array.isArray(todos)) this.todosSubject$.next(todos || []);
        },

        error: (err) => console.log(err),
      });
  }

  public addTodo(
    newTodo: TodoItem
  ): Observable<{ message: string; success: boolean }> {
    const updatedTodos = [...this.todosSubject$.value, newTodo];

    return this.storage.setItem('todos', updatedTodos).pipe(
      delay(1000),
      tap(() => this.todosSubject$.next(updatedTodos)),
      map(() => {
        const successMessage = `Task bla bla good`;
        return {
          message: successMessage,
          success: true,
        };
      }),
      catchError((err) => {
        return of({
          message: err,
          success: false,
        });
      })
    );
  }
}
