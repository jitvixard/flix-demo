import { Subject } from 'rxjs';
import { calculateUpdatedDuration } from '../util/utility';
import { lerp } from '../util/transformation';

export abstract class AbstractAnimationService {
  complete$ = new Subject<boolean>();

  protected adjustDuration = true;

  protected currentIntervalId: number;
  protected currentValue = 0;

  private startTime: number;
  private timeoutDelay = 3;

  constructor(
    protected elements: HTMLElement[],
    protected startValue: number,
    protected targetValue: number,
    protected duration: number,
    currentValue?: number,
    adjustDuration?: boolean,
  ) {
    if (currentValue) this.currentValue = currentValue;
    if (adjustDuration !== undefined) this.adjustDuration = adjustDuration;
    if (this.adjustDuration) this.startValue = this.currentValue;
  }

  protected abstract updateElementValues(): void;
  abstract getCurrentValue(): number;

  start(): Subject<boolean> {
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

    return this.complete$;
  }

  complete(): void {
    this.currentValue = this.targetValue;
    this.updateElementValues();
    this.end();
  }

  setValue(targetValue: number) {
    this.targetValue = targetValue;
    this.currentValue = this.targetValue;
    this.updateElementValues();
  }

  protected update(): void {
    if (this.currentValue.toFixed(2) === this.targetValue.toFixed(2)) {
      this.complete();
      return;
    }

    this.currentValue = lerp(
      this.startTime,
      this.duration,
      this.startValue,
      this.targetValue,
    );

    this.updateElementValues();

    this.currentIntervalId = setTimeout(
      this.update.bind(this),
      this.timeoutDelay,
    );
  }

  protected end = (): void => {
    this.complete$.next(true);
  };
}
