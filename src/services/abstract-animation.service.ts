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
  }

  protected abstract updateElementValues(): void;
  protected abstract getCurrentValue(): number;

  protected start(): void {
    this.startTime = Date.now();
    this.currentValue = this.getCurrentValue();

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
    this.currentValue = lerp(
      this.startTime,
      this.duration,
      this.startValue,
      this.targetValue,
    );

    this.updateElementValues();

    if (this.currentValue.toFixed(2) === this.targetValue.toFixed(2)) {
      this.end();
      return;
    }

    this.currentIntervalId = setTimeout(
      this.update.bind(this),
      this.timeoutDelay,
    );
  }

  protected end = (): void => {
    this.complete$.next(true);
  };
}
