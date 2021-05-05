import { Animation } from './animation';
import { Subject } from 'rxjs';
import { OpacityAnimationService } from '../services/animation/opacity-animation.service';
import { filter } from 'rxjs/operators';

export class ToastAnimation implements Animation {
  completed$ = new Subject<boolean>();

  private opacityAnimation: OpacityAnimationService;

  private fadeInComplete: boolean;
  private holdComplete: boolean;
  private fadeOutComplete: boolean;

  private fadeInDuration = 100;
  private fadeOutDuration = 1000;
  private holdDuration = 3000;

  private holdIntervalId: number;

  constructor(private toastRef: HTMLElement) {}

  start(): Subject<boolean> {
    this.fadeIn();
    return this.completed$;
  }

  private fadeIn(): void {
    this.opacityAnimation = new OpacityAnimationService(
      [this.toastRef],
      0,
      1,
      this.fadeInDuration,
    );
    this.opacityAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        if (complete) {
          this.fadeInComplete = complete;
          this.holdIntervalId = setTimeout(
            this.fadeOut.bind(this),
            this.holdDuration,
          );
          this.opacityAnimation = undefined;
        }
      });
  }

  private fadeOut(): void {
    this.holdComplete = true;
    this.opacityAnimation = new OpacityAnimationService(
      [this.toastRef],
      1,
      0,
      this.fadeOutDuration,
    );
    this.opacityAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        if (complete) {
          this.fadeOutComplete = complete;
          this.completed$.next(true);
        }
      });
  }

  stop(): void {
    if (this.opacityAnimation) this.opacityAnimation.stop();
    if (this.holdIntervalId && !this.holdComplete)
      clearInterval(this.holdIntervalId);
  }
}
