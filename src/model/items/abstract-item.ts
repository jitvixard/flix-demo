export abstract class AbstractItem {
  public readonly id: string;
  public readonly displayName: string;
  public amount: number;

  public elementRef: HTMLDivElement;
  public iconRef: HTMLImageElement;
  public popupRef: HTMLElement;

  public routineId: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  getPath = (): string => 'assets/icons/' + this.id + '.png';
}
