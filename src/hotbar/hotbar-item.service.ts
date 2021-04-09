import { AbstractItem as Item } from '../model/item';

export class HotbarItemService {
  private readonly hotbarSlots: HTMLElement[];
  private readonly hotbarContents: Item[];

  private readonly interval: number;

  private currentIcon: HTMLElement;

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
        this.upsert(item, index);
        unplaced = false;
      }
      index++;
    }
  }

  private upsert = (item: Item, atIndex: number) => {
    let exsisting = this.hotbarContents[atIndex];

    if (exsisting !== undefined && exsisting.id !== item.id) {
      this.clearSlot(atIndex);
      exsisting = undefined;
    }

    if (exsisting === undefined) {
      this.createIcon(item, atIndex);
    } else {
      if (this.intervalMap.has(exsisting.id)) {
        this.queue(item, atIndex);
        return;
      }

      exsisting.amount += item.amount;
      this.updateIcon(exsisting);
      return;
    }

    this.intervalMap.set(
      item.id,
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
  };

  private updateIcon = (item: Item) => {
    let textElement = item.elementRef.getElementsByTagName('p')[0];
    textElement.innerText = item.amount.toString();
    this.intervalMap.set(
      item.id,
      setTimeout(this.addToHotbar.bind(this, item, Date.now(), true, true), 5),
    );
  };

  private addToHotbar = (
    item: Item,
    startTime: number,
    initial: boolean,
    update?: boolean,
<<<<<<< HEAD
  ) => {
    //setting current image/icon
    if (this.currentIcon === undefined) {
      this.currentIcon = item.elementRef.getElementsByTagName('img')[0];
    }

    //setting target
=======
    selection?: boolean,
  ) => {
    if (this.currentImage === undefined) {
      this.currentImage = item.elementRef.getElementsByTagName('img')[0];
    }

>>>>>>> 4e3517fb9751ed90500ef26acbb198f0aa5cd541
    const startSize = initial ? 1 : 1.25;
    const targetSize = initial ? 1.25 : 1;

    //lerp scale
    this.currentScale = this.lerp(
      startTime,
      this.interval,
      startSize,
      targetSize,
    );
<<<<<<< HEAD
    this.currentIcon.style.scale = this.currentScale.toFixed(2);
=======
    this.currentImage.style.scale = this.currentScale.toFixed(2);
>>>>>>> 4e3517fb9751ed90500ef26acbb198f0aa5cd541

    //lerp transparency if fading in
    if (initial && !update) {
      const targetOpacity = this.lerp(startTime, this.interval, 0, 1);
<<<<<<< HEAD
      this.currentIcon.style.opacity = targetOpacity.toString();
=======
      this.currentImage.style.opacity = targetOpacity.toString();
>>>>>>> 4e3517fb9751ed90500ef26acbb198f0aa5cd541
    }

    //ending animation if target is met
    if (this.currentScale.toFixed(2) === targetSize.toFixed(2)) {
<<<<<<< HEAD
      this.currentIcon = undefined;
=======
      this.currentImage = undefined;
>>>>>>> 4e3517fb9751ed90500ef26acbb198f0aa5cd541
      if (initial) {
        this.intervalMap.set(
          item.id,
          setTimeout(
            this.addToHotbar.bind(this, item, Date.now(), false, update),
            5,
          ),
        );
      } else {
        this.intervalMap.delete(item.id);
      }
      return;
    }

<<<<<<< HEAD
    //running again if not
=======
    //running again
>>>>>>> 4e3517fb9751ed90500ef26acbb198f0aa5cd541
    this.intervalMap.set(
      item.id,
      setTimeout(
        this.addToHotbar.bind(this, item, startTime, initial, update),
        5,
      ),
    );
  };

  private lerp = (
    startTime: number,
    interval: number,
    startValue: number,
    targetValue: number,
  ): number => {
    const fraction = Math.abs(targetValue - startValue) / interval;
    let deltaTime = Date.now() - startTime;
    deltaTime = deltaTime > interval ? interval : deltaTime;
    return startValue > targetValue
      ? startValue - deltaTime * fraction
      : startValue + deltaTime * fraction;
  };

  private queue(item: Item, atIndex: number) {
    setTimeout(this.canPop.bind(this, item, atIndex), 5);
  }

  private canPop(item: Item, atIndex: number) {
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
