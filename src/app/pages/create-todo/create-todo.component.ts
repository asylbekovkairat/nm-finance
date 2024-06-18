import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import {
  asyncFutureDateValidator,
  timeValidator,
} from 'app/utils/time.validator';
import { TodoService, TodoItem } from 'app/services/todos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  public todoForm!: FormGroup<{
    title: FormControl<string | null>;
    expireDate: FormControl<string | null>;
    expireTime: FormControl<string | null>;
  }>;
  private readonly todosService = inject(TodoService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expireDate: ['', [Validators.required], [asyncFutureDateValidator()]],
      expireTime: ['', [timeValidator()]],
    });
  }

  public onSubmit() {
    const title = this.getFormControl('title').value;
    const expireDate = this.getFormControl('expireDate').value;
    const expireTime = this.getFormControl('expireTime').value;

    const newTodo: TodoItem = {
      title,
      expireTime,
      expireDate: new Date(expireDate).getTime(),
      createdAt: Date.now(),
      id: Date.now(),
      isFavorite: false,
      done: false,
    };

    this.todosService.addTodo(newTodo).subscribe((response) => {
      if (response.success) {
        this.snackBar.open(response.message, 'OK', { duration: 2000 });
        this.todoForm.reset();
        this.router.navigate(['/list']);
      }

      this.snackBar.open(response.message, 'OK', { duration: 2000 });
    });
  }

  private getFormControl(fieldName: string): FormControl {
    return this.todoForm.get(fieldName) as FormControl;
  }
}
