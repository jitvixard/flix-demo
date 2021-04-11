export abstract class AbstractItem {
  public readonly id: string;
  public readonly displayName: string;
  public amount: number;

  public elementRef: HTMLDivElement;
  public routineId: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  getPath = (): string => '../Assets/icons/' + this.id + '.png';
}
