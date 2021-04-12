import { Apple } from './impl/apple';
import { Banana } from './impl/banana';
import { Bread } from './impl/bread';
import { Carrot } from './impl/carrot';
import { Orange } from './impl/orange';
import { Pear } from './impl/pear';

export abstract class AbstractItem {
  public readonly id: string;
  public readonly displayName: string;
  public amount: number;

  public elementRef: HTMLDivElement;
  public iconRef: HTMLImageElement;

  public routineId: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  getPath = (): string => '../Assets/icons/' + this.id + '.png';
}
