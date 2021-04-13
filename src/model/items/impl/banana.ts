import { AbstractItem } from '../abstract-item';

export class Banana extends AbstractItem {
  id = 'banana';
  displayName = 'Banana';

  constructor(amount: number) {
    super(amount);
  }
}
