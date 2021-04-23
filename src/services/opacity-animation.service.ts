import { AbstractAnimationService } from './abstract-animation.service';

export class OpacityAnimationService extends AbstractAnimationService {
  protected getElementValue(): number {
    return 0;
  }

  protected setElementValue(): number {
    return 0;
  }
}
