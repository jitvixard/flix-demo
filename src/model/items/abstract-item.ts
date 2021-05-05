export abstract class AbstractItem {
  public readonly id: string;
  public readonly displayName: string;
  public amount: number;

  //for hot bar
  public contentRef: HTMLDivElement;
  public iconRef: HTMLImageElement;
  public textRef: HTMLParagraphElement;
  //for toast
  public popupRef: HTMLElement;

  protected constructor(amount: number) {
    this.amount = amount;
  }

  getPath = (): string => 'assets/icons/' + this.id + '.png';
}
