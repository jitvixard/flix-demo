import { AbstractAnimationService } from './abstract-animation.service';
import { getElementTranslation } from '../util/utility';

export class TranslationAnimationService extends AbstractAnimationService {
  constructor(
    private axis: 'X' | 'Y',
    elements: HTMLElement[],
    startValue: number,
    targetValue: number,
    duration: number,
    currentValue?: number,
    adjustDuration?: boolean,
  ) {
    super(
      elements,
      startValue,
      targetValue,
      duration,
      currentValue,
      adjustDuration,
    );
    this.elements = elements;
    this.startValue = startValue;
    this.targetValue = targetValue;
    this.duration = duration;
  }

  protected updateElementValues(): void {
    this.elements.forEach((e) => {
      e.style.transform =
        'translate' + this.axis + '(' + this.currentValue + '%)';
    });
  }

  getCurrentValue(): number {
    const element = this.elements[0];
    if (element === undefined) return undefined;
    return getElementTranslation(element);
  }
}
