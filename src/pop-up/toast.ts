import { AbstractItem as Item } from '../model/items/abstract-item';

export class Toast {
  private readonly toastSet = new Set<Item>();
  private readonly activeToast = new Set<Item>();

  private readonly fadeOnInterval = 100;
  private readonly fadeOffInterval = 1000;
  private readonly stayInterval = 3000;

  intervalMap = new Map<Item, number>();
  stayMap = new Map<Item, number>();

  itemQueue = new Array<Item>();

  toastContainer: HTMLElement;

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
  }

  add(itemToAdd: Item) {
    this.upsertItem(itemToAdd);
  }

  fade(
    itemToFade: Item,
    fadeIn: boolean,
    startTime?: number,
    startingOpacity?: number,
  ) {
    this.intervalMap.delete(itemToFade);

    if (startTime === undefined) startTime = Date.now();

    const ref = itemToFade.popupRef;

    let interval = fadeIn ? this.fadeOnInterval : this.fadeOffInterval;

    const targetOpacity = fadeIn ? 1 : 0;

    if (startingOpacity === undefined) startingOpacity = fadeIn ? 0 : 1;
    else
      interval = this.getUpdatedInterval(
        fadeIn ? 0 : 1,
        targetOpacity,
        startingOpacity,
      );

    const currentOpacity = window.setElementOpacity(
      ref,
      targetOpacity,
      startingOpacity,
      startTime,
      interval,
    );

    if (currentOpacity.toFixed(2) === targetOpacity.toFixed(2)) {
      if (fadeIn) {
        this.intervalMap.set(
          itemToFade,
          setTimeout(
            this.fade.bind(this, itemToFade, false),
            this.stayInterval,
          ),
        );
      } else {
        this.deleteElement(itemToFade);
      }
      return;
    }

    this.intervalMap.set(
      itemToFade,
      setTimeout(this.fade.bind(this, itemToFade, fadeIn, startTime), 5),
    );
  }

  private popToast() {
    if (this.itemQueue.length < 1) return;

    let poppedToast = this.itemQueue.pop();
    this.activeToast.add(poppedToast);
    //appending toast to container
    this.toastContainer.appendChild(poppedToast.popupRef);

    this.intervalMap.set(
      poppedToast,
      setTimeout(this.fade.bind(this, poppedToast, true, Date.now()), 5),
    );
  }

  private createToastElement(item: Item): Item {
    //create toast element and set opacity
    let toast = document.createElement('div');
    toast.className = 'popup-toast';
    toast.style.opacity = (0).toString();

    //create content
    let content = document.createElement('div');
    content.classList.add('item', item.id);

    //create image
    let image = document.createElement('img');
    image.setAttribute('src', item.getPath());

    //set text
    let text = document.createElement('p');
    text.innerText = item.amount + ' x ' + item.displayName + ' Added';

    //append elements to pop-up
    content.appendChild(image);
    content.appendChild(text);

    //set content
    toast.appendChild(content);

    //setting to model
    item.popupRef = toast;

    //storing
    this.toastSet.add(item);

    return item;
  }

  private getExisting(item: Item): Item {
    //stopping timeout
    if (this.intervalMap.has(item)) {
      let intervalId = this.intervalMap.get(item);
      clearInterval(intervalId);
      this.intervalMap.delete(item);
    }

    if (this.stayMap.has(item)) {
      let intervalId = this.stayMap.get(item);
      clearTimeout(intervalId);
      this.stayMap.delete(item);
    }

    //fetch exsisting item from set
    let exsistingItem = this.exisitingItem(item);

    //update amount
    exsistingItem.amount += item.amount;
    //update text
    let textNode = exsistingItem.popupRef.querySelector('p');
    textNode.textContent =
      exsistingItem.amount + ' x ' + exsistingItem.displayName + ' Added';

    return exsistingItem;
  }

  private upsertItem(itemToAdd: Item) {
    itemToAdd = this.itemAlreadyPresent(itemToAdd)
      ? this.getExisting(itemToAdd)
      : this.createToastElement(itemToAdd);

    if (this.itemHasActiveToast(itemToAdd)) {
      this.extendAnimation(itemToAdd);
      return;
    }

    this.itemQueue.push(itemToAdd);

    if (this.activeToast.size < 2) this.popToast();
  }

  private extendAnimation(item: Item) {
    if (this.stayMap.has(item)) {
      clearTimeout(this.stayMap.get(item));

      this.stayMap.set(
        item,
        setTimeout(this.fade.bind(this, item, false), this.stayInterval),
      );
    } else {
      if (this.intervalMap.has(item)) {
        clearTimeout(this.intervalMap.get(item));
      }
      this.intervalMap.set(
        item,
        setTimeout(
          this.fade.bind(
            this,
            item,
            true,
            Date.now(),
            window.getElementOpacity(item.popupRef),
          ),
        ),
      );
    }
  }

  private deleteElement(item: Item) {
    let ref = item.popupRef;
    ref.parentElement.removeChild(ref);

    this.toastSet.delete(item);

    let shouldPop = this.activeToast.size >= 2;

    if (this.activeToast.has(item)) this.activeToast.delete(item);

    if (shouldPop) this.popToast();
  }

  private itemAlreadyPresent = (item: Item): boolean => {
    let present = false;
    this.toastSet.forEach((toast) => {
      if (toast.id === item.id) present = true;
    });
    return present;
  };

  private itemHasActiveToast = (item: Item): boolean => {
    let present = false;
    this.activeToast.forEach((toast) => {
      if (item.id === toast.id) present = true;
    });
    return present;
  };

  private exisitingItem = (item: Item): Item => {
    let exsisting: Item;
    this.toastSet.forEach((toast) => {
      if (toast.id === item.id) exsisting = toast;
    });
    return exsisting;
  };

  private getUpdatedInterval = (
    startValue: number,
    targetValue: number,
    actualValue: number,
  ): number =>
    (this.fadeOnInterval / Math.abs(targetValue - startValue)) * actualValue;
}
