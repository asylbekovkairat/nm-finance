import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItem } from 'app/services/todos.service';
import { Observable } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CountdownTimerComponent } from '@components/timer/timer.component';

@Component({
  selector: 'app-todos-table',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    CountdownTimerComponent,
    MatIconButton,
  ],
  templateUrl: './todos-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './todos-table.component.scss',
})
export class TodosTableComponent {
  @Input({ required: true }) todos!: Observable<TodoItem[]> | null | any;
  @Input({ required: true }) tableTitle!: string;

  public getReadableDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    return formattedDate;
  }
}
