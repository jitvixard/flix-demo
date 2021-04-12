import { AbstractItem } from '../abstract-item';

export class Orange extends AbstractItem {
  id = 'orange';
  displayName = 'Orange';

  constructor(amount: number) {
    super(amount);
  }
}
