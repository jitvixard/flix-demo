import { OpacityAnimationService } from '../services/animation/opacity-animation.service';
import { TranslationAnimationService } from '../services/animation/translation-animation.service';
import { Animation } from './animation';
import { Subject } from 'rxjs';
import { isScreenFullWidth } from '../util/utility';
import { filter } from 'rxjs/operators';

export class CascadeAnimation implements Animation {
  completed$ = new Subject<boolean>();

  private opacityAnimation: OpacityAnimationService;
  private translationAnimation: TranslationAnimationService;

  private cascadeComplete: boolean;
  private opacityComplete: boolean;
  private translationComplete: boolean;

  private readonly startPosition: number;
  private readonly endPosition: number;
  private readonly startOpacity: number;
  private readonly endOpacity: number;

  private segmentIndex: number;

  private duration = 100;

  constructor(private segments: HTMLElement[][], private cascadingOn: boolean) {
    const fullWidth = isScreenFullWidth();
    const distance = fullWidth ? 130 : 230;

    this.startPosition = cascadingOn ? distance : 0;
    this.endPosition = cascadingOn ? 0 : distance;

    this.startOpacity = cascadingOn ? 0 : 1;
    this.endOpacity = cascadingOn ? 1 : 0;

    this.segmentIndex = cascadingOn ? 0 : this.segments.length - 1;
  }

  start(): Subject<boolean> {
    this.playSegment(this.segments[this.segmentIndex]);
    return this.completed$;
  }

  private queueSegment() {
    this.segmentIndex = this.cascadingOn
      ? this.segmentIndex + 1
      : this.segmentIndex - 1;
    if (this.shouldStop()) this.completed$.next(true);
    else this.playSegment(this.segments[this.segmentIndex]);
  }

  private playSegment(segment: HTMLElement[]) {
    this.opacityComplete = false;
    this.translationComplete = false;

    this.opacityAnimation = new OpacityAnimationService(
      segment,
      this.startOpacity,
      this.endOpacity,
      this.duration,
    );
    this.translationAnimation = new TranslationAnimationService(
      'Y',
      segment,
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
          this.queueSegment();
      });
    this.translationAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.translationComplete = complete;
        if (this.opacityComplete && this.translationComplete)
          this.queueSegment();
      });
  }

  private shouldStop(): boolean {
    return (
      this.cascadeComplete ||
      this.segmentIndex < 0 ||
      this.segmentIndex >= this.segments.length
    );
  }

  stop(): void {
    this.cascadeComplete = true;
    this.opacityAnimation.stop();
    this.translationAnimation.stop();
  }
}
