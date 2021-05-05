import { AbstractAnimationService } from './abstract-animation.service';
import { getElementScale } from '../../util/utility';

export class ScaleAnimationService extends AbstractAnimationService {
  protected updateElementValues(): void {
    this.elements.forEach((e) => {
      e.style.scale = this.currentValue.toFixed(2);
    });
  }

  getCurrentValue(): number {
    let element: HTMLElement;
    while (element === undefined) {
      element = this.elements[0];
    }
    return getElementScale(element);
  }
}
