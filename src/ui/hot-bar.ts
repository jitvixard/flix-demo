import { CascadeAnimation } from '../animations/cascade-animation';
import { SubtleFadeAnimation } from '../animations/subtle-fade-animation';
import { first } from 'rxjs/operators';
import { valueAsTransformString } from '../util/transformation';

export class HotBar {
  private cascadeAnimation: CascadeAnimation;
  private subtleFadeAnimation: SubtleFadeAnimation;

  private hotBarOnState = true;

  constructor(private hotBarRef: HTMLElement) {
    this.hotBarRef.style.translate = valueAsTransformString(0, 'X');
    this.hotBarRef.style.transform = valueAsTransformString(0, 'Y');
  }

  cascade(): void {}

  subtleFade(): void {
    //TODO remove
    console.log('subtle fade animation playing');
    //TODO stop if already running
    this.hotBarOnState = !this.hotBarOnState;
    this.subtleFadeAnimation = new SubtleFadeAnimation(
      this.hotBarRef,
      this.hotBarOnState,
    );

    this.subtleFadeAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.subtleFadeAnimation = undefined;
      });
  }
}
