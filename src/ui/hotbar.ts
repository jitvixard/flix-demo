import { CascadeAnimation } from '../animations/cascade-animation';
import { SubtleFadeAnimation } from '../animations/subtle-fade-animation';
import { filter, first } from 'rxjs/operators';

export class Hotbar {
  private readonly hotbarRef: HTMLElement;

  private cascadeAnimation: CascadeAnimation;
  private subtleFadeAnimation: SubtleFadeAnimation;

  private hotbarOnState = true;

  constructor() {
    this.hotbarRef = document.getElementById('hotbar');
  }

  cascade(): void {}

  subtleFade(): void {
    this.hotbarOnState = !this.hotbarOnState;
    this.subtleFadeAnimation = new SubtleFadeAnimation(
      this.hotbarRef,
      this.hotbarOnState,
    );
    this.subtleFadeAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.subtleFadeAnimation = undefined;
      });
  }
}
