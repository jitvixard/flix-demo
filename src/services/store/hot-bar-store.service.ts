import { AbstractItem } from '../../model/items/abstract-item';
import { ItemAdditionAnimation } from '../../animations/item-addition-animation';
import { createHotBarItem, updateHotBarText } from '../../util/factory';

export class HotBarStoreService {
  private itemsOnHotBar: AbstractItem[];
  private additionAnimations = new Map<AbstractItem, ItemAdditionAnimation>();

  constructor(private itemSlots: HTMLElement[]) {
    this.itemsOnHotBar = new Array<AbstractItem>(this.itemSlots.length);
  }

  add(itemAdded: AbstractItem, atIndex?: number): AbstractItem {
    let indexOfExisting = this.indexOf(itemAdded);
    indexOfExisting = indexOfExisting > -1 ? indexOfExisting : undefined;
    if (
      (indexOfExisting !== undefined && atIndex === undefined) ||
      (atIndex !== undefined && atIndex == indexOfExisting)
    ) {
      return this.update(itemAdded);
    }

    let i = 0;
    while (i < this.itemSlots.length) {
      let content = this.itemsOnHotBar[i];
      if (atIndex !== undefined) {
        if (atIndex === i) {
          if (content) {
            if (content.id !== itemAdded.id) {
              this.remove(atIndex);
              return this.create(itemAdded, atIndex);
            } else {
              return this.update(itemAdded);
            }
          } else {
            return this.create(itemAdded, atIndex);
          }
        } else if (indexOfExisting === i) {
          this.remove(i);
        }
      } else if (content === undefined) {
        return this.create(itemAdded, i);
      }
      i++;
    }

    return undefined;
  }

  get(item: AbstractItem): AbstractItem {
    let index = this.indexOf(item);
    if (index < 0) return undefined;
    return this.itemsOnHotBar[index];
  }

  getAtIndex(index: number): AbstractItem {
    return this.itemsOnHotBar[index];
  }

  contains(item: AbstractItem): boolean {
    let present = false;
    this.itemsOnHotBar.forEach((i) => {
      if (i.id === item.id) present = true;
    });
    return present;
  }

  indexOf(item: AbstractItem): number {
    let index = -1;
    if (this.contains(item)) {
      let i = 0;
      this.itemsOnHotBar.forEach((entry) => {
        if (entry.id === item.id) {
          index = i;
        }
        i++;
      });
    }
    return index;
  }

  private setAnimation(item: AbstractItem, animation: ItemAdditionAnimation) {
    const existing = this.additionAnimations.get(item);
    if (existing) existing.stop();
    this.additionAnimations.set(item, animation);
  }

  private removeAnimation(item: AbstractItem) {
    item = this.get(item);
    this.additionAnimations.delete(item);
  }

  private remove(index: number) {
    const item = this.itemsOnHotBar[index];
    if (item) {
      this.itemSlots[index] = undefined;
    }
    this.itemsOnHotBar[index] = undefined;
  }

  private create(item: AbstractItem, atIndex: number): AbstractItem {
    createHotBarItem(item);

    this.itemsOnHotBar[atIndex] = item;
    this.itemSlots[atIndex].appendChild(item.contentRef);

    const additionAnim = new ItemAdditionAnimation(item.iconRef);
    this.setAnimation(item, additionAnim);
    additionAnim
      .start()
      .pipe((v) => v)
      .subscribe((complete) => {
        if (complete) {
          this.removeAnimation(item);
        }
      });
    return item;
  }

  private update(item: AbstractItem): AbstractItem {
    const existing = this.get(item);
    existing.amount += item.amount;
    updateHotBarText(existing);
    const animation = new ItemAdditionAnimation(existing.iconRef);
    this.setAnimation(existing, animation);
    animation
      .start()
      .pipe((v) => v)
      .subscribe((complete) => {
        if (complete) {
          this.removeAnimation(item);
        }
      });
    return existing;
  }
}
