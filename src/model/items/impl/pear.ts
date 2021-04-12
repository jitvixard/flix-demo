import { AbstractItem } from '../abstract-item';

export class Pear extends AbstractItem {
  id = 'pear';
  displayName = 'Pear';

  constructor(amount: number) {
    super(amount);
  }
}
