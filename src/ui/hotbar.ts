export class Hotbar {
  readonly elementRef: HTMLElement;

  private readonly columns: HTMLElement[][];
  private readonly slots: HTMLElement[];

  constructor() {
    this.elementRef = document.getElementById('');

    this.slots = <HTMLElement[]>(<any>document.getElementsByClassName(''));

    let i = 0;
    const rowSize = Math.round(this.slots.length / 2);

    while (i < rowSize) {
      this.columns[0] = [this.slots[i], this.slots[i + rowSize]];
      i++;
    }
  }
}
