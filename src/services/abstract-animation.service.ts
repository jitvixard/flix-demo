import { Subject } from 'rxjs';
import { calculateUpdatedDuration } from '../util/utility';
import { lerp } from '../util/transformation';

export abstract class AbstractAnimationService {
  complete$ = new Subject<boolean>();

  protected adjustDuration = true;

  protected currentIntervalId: number;
  protected currentValue: number;

  private startTime: number;
  private timeoutDelay = 3;

  constructor(
    protected elements: HTMLElement[],
    protected startValue: number,
    protected targetValue: number,
    protected duration: number,
    adjustDuration?: boolean,
  ) {
    if (adjustDuration) this.adjustDuration = adjustDuration;
    this.start();
  }

  protected abstract setElementValue(value: number): number;
  protected abstract getElementValue(): number;

  protected start(): void {
    this.startTime = Date.now();
    this.currentValue = this.getElementValue();

    if (this.adjustDuration) {
      this.duration = calculateUpdatedDuration(
        this.startValue,
        this.currentValue,
        this.targetValue,
        this.duration,
      );
    }

    this.currentIntervalId = setTimeout(
      this.update.bind(this),
      this.timeoutDelay,
    );
  }

  protected update(): void {
    this.currentValue = this.setElementValue(
      lerp(this.startTime, this.duration, this.startValue, this.targetValue),
    );

    if (this.currentValue.toFixed(2) === this.targetValue.toFixed(2)) {
      this.end();
      return;
    }

    this.currentIntervalId = setTimeout(
      this.update.bind(this),
      this.timeoutDelay,
    );
  }

  protected end(): void {
    this.complete$.next(true);
  }
}
