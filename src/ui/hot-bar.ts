import { CascadeAnimation } from '../animations/cascade-animation';
import { SubtleFadeAnimation } from '../animations/subtle-fade-animation';
import { first } from 'rxjs/operators';
import { valueAsTransformString } from '../util/transformation';
import { calculateHotBarColumns } from '../util/utility';

export class HotBar {
  private hotBarColumns: HTMLElement[][];

  private cascadeAnimation: CascadeAnimation;
  private subtleFadeAnimation: SubtleFadeAnimation;

  private hotBarOnState = true;
  private elementsOnState = true;

  constructor(private hotBarRef: HTMLElement) {
    this.hotBarRef.style.translate = valueAsTransformString(0, 'X');
    this.hotBarRef.style.transform = valueAsTransformString(0, 'Y');

    this.hotBarRef.style.opacity = '1';
  }

  cascade(elementsStateOverride?: boolean): void {
    if (this.cascadeAnimation) {
      this.cascadeAnimation.stop();
      return;
    }

    this.elementsOnState =
      elementsStateOverride !== undefined
        ? elementsStateOverride
        : !this.elementsOnState;

    this.cascadeAnimation = new CascadeAnimation(
      this.hotBarColumns,
      this.elementsOnState,
    );

    this.cascadeAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.cascadeAnimation = undefined;
      });
  }

  subtleFade(hotBarStateOverride?: boolean): void {
    if (this.subtleFadeAnimation) {
      this.subtleFadeAnimation.stop();
      return;
    }

    this.hotBarOnState =
      hotBarStateOverride !== undefined
        ? hotBarStateOverride
        : !this.hotBarOnState;

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

  updateColumns() {
    this.hotBarColumns = calculateHotBarColumns();
  }
}
