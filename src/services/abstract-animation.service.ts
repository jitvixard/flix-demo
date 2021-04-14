import { BehaviorSubject } from 'rxjs';

export class AbstractAnimationService {
  protected readonly elementMap = new Map<
    HTMLElement[],
    [BehaviorSubject<boolean>, number]
  >();

  protected complete(elements: HTMLElement[]) {
    this.getObservableFromMap(elements, this.elementMap).next(true);
    this.elementMap.delete(elements);
  }

  protected getAdjustedInterval = (
    idealStartPosition: number,
    currentPosition: number,
    targetPosition: number,
    interval: number,
  ): number => {
    let fullValue = Math.abs(targetPosition - idealStartPosition);
    let actualValue = Math.abs(targetPosition - currentPosition);
    return (interval / fullValue) * actualValue;
  };

  protected getObservableFromMap(
    elements: HTMLElement[],
    storageMap: Map<HTMLElement[], [BehaviorSubject<boolean>, number]>,
  ): BehaviorSubject<boolean> {
    if (storageMap.has(elements)) return storageMap.get(elements)[0];
    else return undefined;
  }
}
