import { Subject } from 'rxjs';
import { calculateRemainingDuration } from '../../util/utility';
import { lerp } from '../../util/transformation';

export abstract class AbstractAnimationService {
  complete$ = new Subject<boolean>();

  protected adjustDuration = true;

  protected currentIntervalId: number;
  protected currentValue = 0;

  private startTime: number;
  private timeoutDelay = 3;

  constructor(
    protected readonly elements: HTMLElement[],
    protected readonly startValue: number,
    protected readonly targetValue: number,
    protected duration: number,
    currentValue?: number,
    adjustDuration?: boolean,
  ) {
    this.currentValue = currentValue ? currentValue : this.getCurrentValue();
    if (adjustDuration !== undefined) this.adjustDuration = adjustDuration;
  }

  protected abstract updateElementValues(): void;
  abstract getCurrentValue(): number;

  start(): Subject<boolean> {
    this.startTime = Date.now();
    this.currentValue = this.getCurrentValue();

    if (this.adjustDuration) {
      const remainingDuration = calculateRemainingDuration(
        this.startValue,
        this.currentValue,
        this.targetValue,
        this.duration,
      );
      const offset = this.duration - remainingDuration;
      this.startTime -= offset;
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

  stop(): void {
    clearInterval(this.currentIntervalId);
    this.complete$.next(true);
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
