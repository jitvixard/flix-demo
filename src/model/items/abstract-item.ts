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

export function getItemFromName(name: string): AbstractItem {
  switch (name.toLowerCase()) {
    case 'apple': {
      return new Apple(1);
    }
    case 'banana': {
      return new Banana(1);
    }
    case 'bread': {
      return new Bread(1);
    }
    case 'carrot': {
      return new Carrot(1);
    }
    case 'orange': {
      return new Orange(1);
    }
    case 'pear': {
      return new Pear(1);
    }
  }
}
