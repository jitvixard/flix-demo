import { AbstractItem as Item } from '../model/item';

export class HotbarItemService {
  private readonly hotbarSlots: HTMLElement[];
  private readonly hotbarContents: Item[];

  private readonly contentClassname: string;

  constructor() {
    this.hotbarSlots = [].slice.call(
      document.getElementsByClassName('hotbar-item'),
    );

    this.hotbarContents = new Array<Item>(this.hotbarSlots.length);
  }

  add(item: Item, atIndex?: number) {
    console.log('adding');

    let index = 0;
    let unplaced = true;
    let currentRef: Item;

    while (index < this.hotbarContents.length) {
      currentRef = this.hotbarContents[index];

      if (
        ((atIndex !== undefined && atIndex === index) ||
          (atIndex === undefined && currentRef === undefined)) &&
        unplaced
      ) {
        console.log('upserting ' + item.id + ' at index ' + index);
        this.upsert(item, index);
        unplaced = false;
      }
      index++;
    }
  }

  private upsert = (item: Item, atIndex: number) => {
    let exsisting = this.hotbarContents[atIndex];

    if (exsisting !== undefined && exsisting.id !== item.id) {
      console.log('clearing old element');
      this.clearSlot(atIndex);
      exsisting = undefined;
    }

    if (exsisting === undefined) {
      console.log('creating new element');
      this.createIcon(item, atIndex);
    }

    console.log('playing animation');
    this.playAnimation(item, atIndex);
  };

  private clearSlot = (index: number) => {
    let itemToRemove = this.hotbarContents[index];
    this.hotbarContents[index] = undefined;
    this.hotbarSlots[index].parentElement.removeChild(itemToRemove.elementRef);
  };

  private createIcon = (item: Item, atIndex: number) => {
    //creation of icon & make transparent
    let icon = document.createElement('div');
    icon.className = 'hotbar-content';
    icon.style.opacity = (0).toString();

    //setting of icon
    let iconImg = document.createElement('img');
    iconImg.setAttribute('src', item.getPath());

    //setting into element
    icon.appendChild(iconImg);

    //setting refs icon
    this.hotbarSlots[atIndex].appendChild(icon);
    item.elementRef = icon;
  };

  private playAnimation = (item: Item, atIndex: number) => {
    let elementRef = item.elementRef;
    elementRef.style.opacity = (1).toString();
  };
}
