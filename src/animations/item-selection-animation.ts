import { Animation } from './animation';
import { Subject } from 'rxjs';
import { removeElement } from '../util/utility';
import { OpacityAnimationService } from '../services/animation/opacity-animation.service';
import { ScaleAnimationService } from '../services/animation/scale-animation.service';
import { first } from 'rxjs/operators';

export class ItemSelectionAnimation implements Animation {
  complete$ = new Subject<boolean>();

  private selectionElement: HTMLElement;

  private opacityAnimation: OpacityAnimationService;
  private scaleAnimation: ScaleAnimationService;

  private duration = 250;

  constructor(private hotBarSlot: HTMLElement, private iconRef: HTMLElement) {}

  start(): Subject<boolean> {
    this.selectionElement = document.createElement('div');
    this.selectionElement.className = 'selected';
    this.selectionElement.style.opacity = (0).toString();

    this.hotBarSlot.appendChild(this.selectionElement);

    this.opacityAnimation = new OpacityAnimationService(
      [this.selectionElement],
      0,
      1,
      this.duration,
    );
    this.opacityAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.opacityAnimation = undefined;
      });

    if (this.iconRef) {
      this.scaleAnimation = new ScaleAnimationService(
        [this.iconRef],
        1,
        1.25,
        this.duration,
      );

      this.scaleAnimation
        .start()
        .pipe(first((v) => v))
        .subscribe((complete) => {
          if (complete) this.scaleAnimation = undefined;
        });
    }
    return this.complete$;
  }

  stop(): void {
    if (this.opacityAnimation) this.opacityAnimation.stop();
    if (this.scaleAnimation) this.scaleAnimation.stop();

    this.opacityAnimation = new OpacityAnimationService(
      [this.selectionElement],
      1,
      0,
      this.duration,
    );
    if (this.iconRef) {
      this.scaleAnimation = new ScaleAnimationService(
        [this.iconRef],
        1.25,
        1,
        this.duration,
      );
    }

    this.opacityAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.opacityAnimation = undefined;
        if (
          this.opacityAnimation === undefined &&
          this.scaleAnimation === undefined
        ) {
          this.destroy();
        }
      });
    if (this.iconRef) {
      this.scaleAnimation
        .start()
        .pipe(first((v) => v))
        .subscribe((complete) => {
          if (complete) this.scaleAnimation = undefined;
          if (
            this.opacityAnimation === undefined &&
            this.scaleAnimation === undefined
          ) {
            this.destroy();
          }
        });
    }
  }

  private destroy(): void {
    removeElement(this.selectionElement);
    this.complete$.next(true);
  }
}
