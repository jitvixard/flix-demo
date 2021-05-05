import { OpacityAnimationService } from '../services/animation/opacity-animation.service';
import { TranslationAnimationService } from '../services/animation/translation-animation.service';
import { Animation } from './animation';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class SubtleFadeAnimation implements Animation {
  completed$: Subject<boolean>;

  private opacityAnimation: OpacityAnimationService;
  private translationAnimation: TranslationAnimationService;

  private opacityComplete: boolean;
  private translationComplete: boolean;

  private readonly startPosition: number;
  private readonly endPosition: number;
  private readonly startOpacity: number;
  private readonly endOpacity: number;

  private duration = 1000;

  constructor(private hotBarElement: HTMLElement, fadingOn: boolean) {
    const distance = 125;

    this.startPosition = fadingOn ? distance : 0;
    this.endPosition = fadingOn ? 0 : distance;

    this.startOpacity = fadingOn ? 0 : 1;
    this.endOpacity = fadingOn ? 1 : 0;

    this.completed$ = new Subject<boolean>();
  }

  start(override?: boolean): Subject<boolean> {
    this.play();
    return this.completed$;
  }

  private play() {
    this.opacityAnimation = new OpacityAnimationService(
      [this.hotBarElement],
      this.startOpacity,
      this.endOpacity,
      this.duration,
    );
    this.translationAnimation = new TranslationAnimationService(
      'X',
      [this.hotBarElement],
      this.startPosition,
      this.endPosition,
      this.duration,
    );

    this.opacityAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.opacityComplete = complete;
        if (this.opacityComplete && this.translationComplete)
          this.completed$.next(true);
      });
    this.translationAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.translationComplete = complete;
        if (this.opacityComplete && this.translationComplete)
          this.completed$.next(true);
      });
  }

  stop(): void {
    this.translationAnimation.stop();
    this.opacityAnimation.stop();
  }
}
