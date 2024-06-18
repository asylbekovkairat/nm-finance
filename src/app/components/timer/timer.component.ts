import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  template: '<p>{{ timeDisplay$ | async }}</p>',
  imports: [AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) expireDate!: Date | string | number;
  @Input({ required: true }) expireTime!: number;

  private readonly ngZone = inject(NgZone);
  private timerId: any;

  public readonly timeDisplay$ = new BehaviorSubject<string>('00:00:00');
  public readonly time$ = this.timeDisplay$.asObservable();

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.timerId = setInterval(() => {
      this.ngZone.run(() => {
        this.updateTime();
      });
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerId);
  }

  updateTime(): void {
    const now = new Date();
    const date1 = new Date(new Date(this.expireDate).setHours(this.expireTime));
    const diff = Math.max(date1.getTime() - now.getTime(), 0);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    console.log('diff', diff);
    console.log('date1', date1);

    const formatted =
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds);

    this.timeDisplay$.next(formatted);

    console.log('formatted', formatted);
  }

  formatTime(time: number): string {
    return (time < 10 ? '0' : '') + time;
  }
}
