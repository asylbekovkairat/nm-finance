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
import { TodoService } from 'app/services/todos.service';

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
    expirationDate: FormControl<string | null>;
    expirationTime: FormControl<string | null>;
  }>;
  private readonly todosService = inject(TodoService);

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      expirationDate: ['', [Validators.required], [asyncFutureDateValidator()]],
      expirationTime: ['', [timeValidator()]],
    });
  }

  public onSubmit(): void {
    this.todosService.addTodo(this.todoForm.value);
  }
}
