import { Injectable, inject } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, delay } from 'rxjs';

type TodoItem = {
  expireDate: string;
  expireTime: string;
  title: string;
};

enum TodosParams {
  ALL = 'all',
  FAVORITE = 'favorite',
  TODAY = 'today',
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storage = inject(StorageMap);
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);

  public todos$ = this.todosSubject.asObservable();

  public addTodo(newTodo: any) {
    this.storage.set('todos', newTodo).subscribe(() => {});
    this.storage.get('todos').subscribe((user) => {
      console.log(user);
    });
  }

  public getTodos() {
    console.log('asd');
    this.storage.clear().subscribe(() => {});

    this.storage
      .get('todos')
      .pipe(delay(500))
      .subscribe({
        next: (todos) => {
          console.log('todos', this.todosSubject.value);
          if (todos && Array.isArray(todos)) {
            this.todosSubject.next(todos || []);
          }
        },
        error: (err) => console.log(err),
      });

    this.storage.get('todos').subscribe((todos) => {
      console.log(todos);
    });
  }
}
