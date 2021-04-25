import { AbstractAnimationService } from './abstract-animation.service';
import { getElementScale } from '../util/utility';

export class ScaleAnimationService extends AbstractAnimationService {
  protected updateElementValues(): void {
    this.elements.forEach((e) => {
      e.style.scale = this.currentValue.toFixed(2);
    });
  }

  getCurrentValue(): number {
    const element = this.elements[0] !== undefined;
    if (element === undefined) return undefined;
    return getElementScale(element);
  }
}
