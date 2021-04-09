import { AbstractItem as Item } from '../model/item';

export class HotbarItemService {
  private readonly hotbarSlots: HTMLElement[];
  private readonly hotbarContents: Item[];

  private readonly contentClassname: string;
  private readonly interval: number;

  private currentImage: HTMLElement;

  private readonly intervalMap = new Map<string, number>();
  private currentScale = 1;

  constructor() {
    this.interval = 500;

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
    } else {
      if (this.intervalMap.has(exsisting.id)) {
        this.intervalMap.set(
          item.id,
          setTimeout(this.queue.bind(this, item, atIndex), 5),
        );
        return;
      }

      exsisting.amount += item.amount;
      this.updateIcon(exsisting);
      console.log(exsisting);
      this.intervalMap.set(
        item.id,
        setTimeout(
          this.playAnimation.bind(this, exsisting, Date.now(), true, true),
          5,
        ),
      );
    }

    this.intervalMap.set(
      item.id,
      setTimeout(this.playAnimation.bind(this, item, Date.now(), true), 5),
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
  };

  private updateIcon = (item: Item) => {
    let textElement = item.elementRef.getElementsByTagName('p')[0];
    textElement.innerText = item.amount.toString();
  };

  private playAnimation = (
    item: Item,
    startTime: number,
    initial: boolean,
    update?: boolean,
  ) => {
    //fresh reference in case fo changes
    if (this.currentImage === undefined) {
      this.currentImage = item.elementRef.getElementsByTagName('img')[0];
    }

    const startSize = initial ? 1 : 1.25;
    const targetSize = initial ? 1.25 : 1;

    let styleString = '';

    //lerp scale
    this.currentScale = this.lerp(
      startTime,
      this.interval,
      startSize,
      targetSize,
    );
    this.currentImage.style.scale = this.currentScale.toFixed(2);

    //lerp transparency if fading in
    if (initial && !update) {
      const targetOpacity = this.lerp(startTime, this.interval, 0, 1);
      this.currentImage.style.opacity = targetOpacity.toString();
    }

    //this.currentImage.setAttribute('style', styleString);

    //ending animation if target is met
    if (this.currentScale.toFixed(2) === targetSize.toFixed(2)) {
      this.currentImage = undefined;
      if (initial) {
        this.intervalMap.set(
          item.id,
          setTimeout(
            this.playAnimation.bind(this, item, Date.now(), false, update),
            5,
          ),
        );
      } else {
        this.intervalMap.delete(item.id);
      }
      return;
    }

    //running again
    this.intervalMap.set(
      item.id,
      setTimeout(
        this.playAnimation.bind(this, item, startTime, initial, update),
        5,
      ),
    );
  };

  private lerp = (
    startTime: number,
    interval: number,
    startSize: number,
    targetSize: number,
  ): number => {
    const fraction = Math.abs(targetSize - startSize) / interval;
    let deltaTime = Date.now() - startTime;
    deltaTime = deltaTime > interval ? interval : deltaTime;
    return startSize > targetSize
      ? startSize - deltaTime * fraction
      : startSize + deltaTime * fraction;
  };

  private queue(item: Item, atIndex: number) {
    if (this.intervalMap.has(item.id)) {
      this.intervalMap.set(
        item.id,
        setTimeout(this.queue.bind(this, item, atIndex), 5),
      );
    } else {
      this.upsert(item, atIndex);
    }
  }
}
