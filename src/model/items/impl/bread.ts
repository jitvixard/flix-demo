import { AbstractItem } from '../abstract-item';

export class Bread extends AbstractItem {
  id = 'bread';
  displayName = 'Bread';

  constructor(amount: number) {
    super(amount);
  }
}
