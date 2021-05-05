import { Animation } from './animation';
import { Subject } from 'rxjs';
import { OpacityAnimationService } from '../services/animation/opacity-animation.service';
import { ScaleAnimationService } from '../services/animation/scale-animation.service';
import { filter } from 'rxjs/operators';

export class ItemAdditionAnimation implements Animation {
  complete$ = new Subject<boolean>();

  private scaleUpComplete = false;
  private scaleDownComplete = false;
  private fadeInComplete = false;

  private opacityAnimation: OpacityAnimationService;
  private scaleAnimtation: ScaleAnimationService;

  private scaleUpTarget = 1.25;
  private scaleDownTarget = 1;

  private duration = 500;

  constructor(private imageRef: HTMLImageElement) {}

  start(): Subject<boolean> {
    this.scaleUp();
    return this.complete$;
  }

  private scaleUp() {
    this.opacityAnimation = new OpacityAnimationService(
      [this.imageRef],
      0,
      1,
      this.duration / 2,
    );
    this.scaleAnimtation = new ScaleAnimationService(
      [this.imageRef],
      this.scaleDownTarget,
      this.scaleUpTarget,
      this.duration / 2,
    );

    this.opacityAnimation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.fadeInComplete = complete;
        if (this.fadeInComplete) this.opacityAnimation = undefined;
        if (this.fadeInComplete && this.scaleUpComplete) this.scaleDown();
      });
    this.scaleAnimtation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.scaleUpComplete = complete;
        if (this.scaleUpComplete) this.scaleAnimtation = undefined;
        if (this.fadeInComplete && this.scaleUpComplete) this.scaleDown();
      });
  }

  private scaleDown() {
    this.scaleAnimtation = new ScaleAnimationService(
      [this.imageRef],
      this.scaleUpTarget,
      this.scaleDownTarget,
      this.duration / 2,
    );
    this.scaleAnimtation
      .start()
      .pipe(filter((v) => v))
      .subscribe((complete) => {
        this.scaleDownComplete = complete;
        if (this.scaleDownComplete) {
          this.scaleAnimtation = undefined;
          this.complete$.next(true);
        }
      });
  }

  stop(): void {
    if (this.opacityAnimation) this.opacityAnimation.stop();
    if (this.scaleAnimtation) this.scaleAnimtation.stop();
  }
}
