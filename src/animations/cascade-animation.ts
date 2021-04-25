import { OpacityAnimationService } from '../services/opacity-animation.service';
import { TranslationAnimationService } from '../services/translation-animation.service';
import { Animation } from './animation';
import { Subject } from 'rxjs';
import { isScreenFullWidth } from '../util/utility';

export class CascadeAnimation implements Animation {
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
  private segmentIndex = 0;

  constructor(private segments: HTMLElement[][], cascadingOn: boolean) {
    const fullWidth = isScreenFullWidth();
    const distance = fullWidth ? 130 : 230;

    this.startPosition = cascadingOn ? distance : 0;
    this.endPosition = cascadingOn ? 0 : distance;

    this.startOpacity = cascadingOn ? 0 : 1;
    this.endOpacity = cascadingOn ? 1 : 0;
  }

  start(): Subject<boolean> {
    this.segmentIndex = -1;
    this.queueSegment();
    return this.completed$;
  }

  private queueSegment() {
    this.segmentIndex++;
    if (this.shouldStop()) this.completed$.next(true);
    else this.playSegment(this.segments[this.segmentIndex]);
  }

  private playSegment(segment: HTMLElement[]) {
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

    this.opacityAnimation.start().subscribe((complete) => {
      this.opacityAnimation = complete;
      if (this.opacityComplete && this.translationComplete) this.queueSegment();
    });
    this.translationAnimation.start().subscribe((complete) => {
      this.translationAnimation = complete;
      if (this.opacityComplete && this.translationComplete) this.queueSegment();
    });
  }

  private shouldStop = (): boolean =>
    this.segmentIndex === this.segments.length;
}
