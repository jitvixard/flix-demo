import { AbstractItem } from '../model/items/abstract-item';
import { Apple } from '../model/items/impl/apple';
import { Banana } from '../model/items/impl/banana';
import { Bread } from '../model/items/impl/bread';
import { Carrot } from '../model/items/impl/carrot';
import { Orange } from '../model/items/impl/orange';
import { Pear } from '../model/items/impl/pear';

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
