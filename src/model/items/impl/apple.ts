import { AbstractItem } from '../abstract-item';

export class Apple extends AbstractItem {
  id = 'apple';
  displayName = 'Apple';

  constructor(amount: number) {
    super(amount);
  }
}
