import { AbstractAnimationService } from './abstract-animation.service';
import { getElementOpacity } from '../util/utility';

export class OpacityAnimationService extends AbstractAnimationService {
  protected updateElementValues(): void {
    this.elements.forEach((e) => {
      e.style.opacity = this.currentValue.toFixed(2);
    });
  }

  getCurrentValue(): number {
    let element = this.elements[0];
    if (element === undefined) return undefined;
    return getElementOpacity(element);
  }
}
