import { AbstractItem as Item } from '../model/items/abstract-item';
import '../util/transformation';

export class HotbarItemService {
  private readonly hotbarSlots: HTMLElement[];
  private readonly hotbarContents: Item[];

  private readonly animationMap: Map<HTMLElement, number>;

  private readonly interval: number;

  constructor() {
    this.interval = 500;

    this.animationMap = new Map<HTMLElement, number>();

    this.hotbarSlots = [].slice.call(
      document.getElementsByClassName('hotbar-item'),
    );

    this.hotbarContents = new Array<Item>(this.hotbarSlots.length);
  }

  add(item: Item, atIndex?: number) {
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
        this.upsert(item, index);
        unplaced = false;
      }
      index++;
    }
  }

  itemPresent(element?: HTMLElement, atIndex?: number): boolean {
    let isPresent = false;

    if (atIndex !== undefined)
      return this.hotbarContents[atIndex] !== undefined;
    else if (element !== undefined) {
      this.hotbarContents.forEach((item) => {
        if (item.elementRef === element) isPresent = true;
      });
    }

    return isPresent;
  }

  private upsert = (item: Item, atIndex: number) => {
    let exsisting = this.hotbarContents[atIndex];

    //Clears slot if item is present
    if (exsisting !== undefined && exsisting.id !== item.id) {
      this.clearSlot(atIndex);
      exsisting = undefined;
    }

    //if nothing exists in that slot, then create an icon and populate it
    if (exsisting === undefined) {
      this.createIcon(item, atIndex);
    } else {
      //if an animation is running on this icon then queue this
      if (this.animationMap.has(exsisting.iconRef)) {
        this.queue(item, atIndex);
        return;
      }

      exsisting.amount += item.amount;
      //run update animation
      this.updateIcon(exsisting);
      return;
    }

    //starts animation
    this.runAnimation(
      item.iconRef,
      setTimeout(this.addToHotbar.bind(this, item, Date.now(), true), 5),
    );
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

    //setting of icon
    let iconImg = document.createElement('img');
    iconImg.setAttribute('src', item.getPath());
    iconImg.style.opacity = (0).toString();

    //setting amount
    let amountText = document.createElement('p');
    amountText.innerText = item.amount.toString();

    //setting into element
    icon.appendChild(iconImg);
    icon.appendChild(amountText);

    //setting refs icon
    this.hotbarSlots[atIndex].appendChild(icon);
    this.hotbarContents[atIndex] = item;
    item.elementRef = icon;
    item.iconRef = iconImg;
  };

  private updateIcon = (item: Item) => {
    let textElement = item.elementRef.getElementsByTagName('p')[0];
    textElement.innerText = item.amount.toString();

    this.runAnimation(
      item.iconRef,
      setTimeout(this.addToHotbar.bind(this, item, Date.now(), true, true), 5),
    );
  };

  private addToHotbar(
    item: Item,
    startTime: number,
    initial: boolean,
    update?: boolean,
  ) {
    //Current icon
    const icon = item.iconRef;

    //Setting target values
    const startSize = initial ? 1 : 1.25;
    const targetSize = initial ? 1.25 : 1;

    //Lerping icons scale
    const currentScale = window.scaleElement(
      icon,
      targetSize,
      startSize,
      startTime,
      this.interval,
    );

    /*  Will lerp the elements opacity,
        if the item is expanding after being added for the first time. */
    if (initial && !update)
      window.setElementOpacity(icon, 1, 0, startTime, this.interval);

    // Will end the animation if element is set to the desired size
    if (currentScale.toFixed(2) === targetSize.toFixed(2)) {
      if (initial) {
        //Will set the start time and initial bool ready to shrink the element
        startTime = Date.now();
        initial = false;
      } else {
        //Otherwise ending the sequence
        this.animationMap.delete(icon);
        return;
      }
    }

    //Running again if not complete
    this.runAnimation(
      icon,
      setTimeout(
        this.addToHotbar.bind(this, item, startTime, initial, update),
        5,
      ),
    );
  }

  private runAnimation(element: HTMLElement, id: number) {
    this.stopAnimation(element);
    this.animationMap.set(element, id);
  }

  private stopAnimation(element: HTMLElement) {
    if (this.animationMap.has(element))
      clearTimeout(this.animationMap.get(element));
  }

  private queue(item: Item, atIndex: number) {
    setTimeout(this.canPop.bind(this, item, atIndex), 5);
  }

  private canPop(item: Item, atIndex: number) {
    if (this.animationMap.has(item.elementRef)) {
      setTimeout(this.queue.bind(this, item, atIndex), 5);
    } else {
      this.upsert(item, atIndex);
    }
  }
}
