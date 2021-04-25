import { OpacityAnimationService } from '../services/opacity-animation.service';
import { TranslationAnimationService } from '../services/translation-animation.service';
import { Animation } from './animation';
import { Subject } from 'rxjs';

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

  constructor(private hotbar: HTMLElement, fadingOn: boolean) {
    const distance = 125;

    this.startPosition = fadingOn ? distance : 0;
    this.endPosition = fadingOn ? 0 : distance;

    this.startOpacity = fadingOn ? 0 : 1;
    this.endOpacity = fadingOn ? 1 : 0;
  }

  start(): Subject<boolean> {
    this.play();
    return this.completed$;
  }

  private play() {
    this.opacityAnimation = new OpacityAnimationService(
      [this.hotbar],
      this.startOpacity,
      this.endOpacity,
      this.duration,
    );
    this.translationAnimation = new TranslationAnimationService(
      'X',
      [this.hotbar],
      this.startPosition,
      this.endPosition,
      this.duration,
    );

    this.opacityAnimation.start().subscribe((complete) => {
      this.opacityComplete = complete;
      if (this.opacityComplete && this.translationComplete)
        this.completed$.next(true);
    });
    this.translationAnimation.start().subscribe((complete) => {
      this.translationComplete = complete;
      if (this.opacityComplete && this.translationComplete)
        this.completed$.next(true);
    });
  }
}
