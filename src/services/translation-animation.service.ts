import { AbstractAnimationService } from './abstract-animation.service';

export class TranslationAnimationService extends AbstractAnimationService {
  constructor(
    protected axis: 'X' | 'Y',
    protected elements: HTMLElement[],
    protected startValue: number,
    protected targetValue: number,
    protected duration: number,
    adjustDuration?: boolean,
  ) {
    super(elements, startValue, targetValue, duration, adjustDuration);
  }

  protected getElementValue(): number {
    return 0;
  }

  protected setElementValue(): number {
    return 0;
  }
}
