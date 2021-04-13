import { BehaviorSubject } from 'rxjs';
import { AbstractAnimationService } from './abstract-animation.service';

export class ScaleAnimationService extends AbstractAnimationService {
  scaleElement(
    elements: HTMLElement[],
    startScale: number,
    targetScale: number,
    interval: number,
  ): BehaviorSubject<boolean> {
    if (elements.length === 0) return undefined;

    let currentScale = window.getElementScale(elements[0]);

    interval = this.getAdjustedInterval(
      startScale,
      currentScale,
      targetScale,
      interval,
    );

    let timeoutId = setTimeout(
      this.translationAnimation.bind(
        this,
        elements,
        [currentScale, targetScale],
        [Date.now(), interval],
      ),
      5,
    );

    const subject = new BehaviorSubject(false);

    this.elementMap.set(elements, [subject, timeoutId]);

    return subject;
  }

  private translationAnimation(
    elements: HTMLElement[],
    startAndEndScale: [number, number],
    startTimeAndInterval: [number, number],
  ) {
    let currentScale: number;
    const startScale = startAndEndScale[0];
    const targetScale = startAndEndScale[1];

    const startTime = startTimeAndInterval[0];
    const interval = startTimeAndInterval[1];

    elements.forEach((e) => {
      currentScale = window.scaleElement(
        e,
        targetScale,
        startScale,
        startTime,
        interval,
      );
    });

    if (currentScale.toFixed(2) === targetScale.toFixed(2))
      this.complete(elements);

    let observerIdTuple = this.elementMap.get(elements);
    observerIdTuple[1] = setTimeout(
      this.translationAnimation.bind(
        this,
        elements,
        startAndEndScale,
        startTimeAndInterval,
      ),
      5,
    );

    this.elementMap.set(elements, observerIdTuple);
  }
}
