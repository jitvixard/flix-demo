import { BehaviorSubject } from 'rxjs';
import { AbstractAnimationService } from './abstract-animation.service';

export class OpacityAnimationService extends AbstractAnimationService {
  setElementOpacity(
    elements: HTMLElement[],
    startOpacity: number,
    targetOpacity: number,
    interval: number,
  ): BehaviorSubject<boolean> {
    if (elements.length === 0) return undefined;

    let currentOpacity = window.getElementOpacity(elements[0]);

    interval = this.getAdjustedInterval(
      startOpacity,
      currentOpacity,
      targetOpacity,
      interval,
    );

    let timeoutId = setTimeout(
      this.opacityAnimation.bind(
        this,
        elements,
        [currentOpacity, targetOpacity],
        [Date.now(), interval],
      ),
      5,
    );

    const subject = new BehaviorSubject(false);

    this.elementMap.set(elements, [subject, timeoutId]);

    return subject;
  }

  private opacityAnimation(
    elements: HTMLElement[],
    startAndEndOpacity: [number, number],
    startTimeAndInterval: [number, number],
  ) {
    let currentOpacity: number;
    const startOpacity = startAndEndOpacity[0];
    const targetOpacity = startAndEndOpacity[1];

    const startTime = startTimeAndInterval[0];
    const interval = startTimeAndInterval[1];

    elements.forEach((e) => {
      currentOpacity = window.setElementOpacity(
        e,
        targetOpacity,
        startOpacity,
        startTime,
        interval,
      );
    });

    if (currentOpacity.toFixed(2) === targetOpacity.toFixed(2))
      this.complete(elements);

    let observerIdTuple = this.elementMap.get(elements);
    observerIdTuple[1] = setTimeout(
      this.opacityAnimation.bind(
        this,
        elements,
        startAndEndOpacity,
        startTimeAndInterval,
      ),
      5,
    );

    this.elementMap.set(elements, observerIdTuple);
  }
}
