import { AbstractItem } from '../abstract-item';

export class Carrot extends AbstractItem {
  id = 'carrot';
  displayName = 'Carrot';

  constructor(amount: number) {
    super(amount);
  }
}
