import { BehaviorSubject } from 'rxjs';
import { AbstractAnimationService } from './abstract-animation.service';

export class TranslationAnimationService extends AbstractAnimationService {
  translateElement(
    elements: HTMLElement[],
    startPosition: number,
    targetPosition: number,
    interval: number,
    axis: string,
  ): BehaviorSubject<boolean> {
    if (elements.length === 0) return undefined;

    let currentPosition = window.getElementTransform(elements[0]);

    interval = this.getAdjustedInterval(
      startPosition,
      currentPosition,
      targetPosition,
      interval,
    );

    let timeoutId = setTimeout(
      this.translationAnimation.bind(
        this,
        elements,
        [currentPosition, targetPosition],
        [Date.now(), interval],
        axis,
      ),
      5,
    );
    const subject = new BehaviorSubject(false);

    this.elementMap.set(elements, [subject, timeoutId]);

    return subject;
  }

  private translationAnimation(
    elements: HTMLElement[],
    startAndEndPosition: [number, number],
    startTimeAndInterval: [number, number],
    axis: string,
  ) {
    let currentTransform: number;
    const startPosition = startAndEndPosition[0];
    const targetPosition = startAndEndPosition[1];

    const startTime = startTimeAndInterval[0];
    const interval = startTimeAndInterval[1];

    elements.forEach((e) => {
      currentTransform = window.setElementTransform(
        e,
        axis.toUpperCase(),
        targetPosition,
        startPosition,
        startTime,
        interval,
      );
    });

    if (currentTransform.toFixed(2) === targetPosition.toFixed(2))
      this.complete(elements);

    let observerIdTuple = this.elementMap.get(elements);
    observerIdTuple[1] = setTimeout(
      this.translationAnimation.bind(
        this,
        elements,
        startAndEndPosition,
        startTimeAndInterval,
        axis,
      ),
      5,
    );

    this.elementMap.set(elements, observerIdTuple);
  }
}
