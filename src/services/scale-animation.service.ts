import { AbstractAnimationService } from './abstract-animation.service';

export class ScaleAnimationService extends AbstractAnimationService {
  protected getElementValue(): number {
    return 0;
  }

  protected setElementValue(): number {
    return 0;
  }
}
