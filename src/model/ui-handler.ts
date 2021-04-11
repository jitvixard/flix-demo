import { AbstractItem as Item } from '../model/items/abstract-item';

export interface UIHandler {
  add(item: Item): void;
  remove(item: Item): void;
}
