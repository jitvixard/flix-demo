import { AbstractItem as Item } from './../model/item';

export class ToastService {
  toastContainer: HTMLElement;
  public toastMap = new Map<string, Item>();

  elementIntervals = new Map<string, number>();

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
  }

  add(itemToAdd: Item) {
    this.upsertItem(itemToAdd, this.elementIntervals, this);
  }

  private removeToast(
    itemToFade: Item,
    intervalMap: Map<string, number>,
    t: ToastService,
  ) {
    if (!t.toastMap.has(itemToFade.id)) return;

    if (intervalMap.has(itemToFade.id)) {
      clearTimeout(intervalMap.get(itemToFade.id));
      intervalMap.delete(itemToFade.id);
    }

    //fade-out routine
    intervalMap.set(
      itemToFade.id,
      setInterval(t.fade, 10, itemToFade, intervalMap, t, false),
    );
  }

  fade(
    itemToFade: Item,
    intervalMap: Map<string, number>,
    t: ToastService,
    fadeIn: boolean,
  ) {
    const ref = itemToFade.elementRef;

    let op: number = parseFloat(ref.style.opacity);
    const targetOp = fadeIn ? 1 : 0;

    if (op === targetOp) {
      clearInterval(intervalMap.get(itemToFade.id));
      intervalMap.delete(itemToFade.id);

      if (fadeIn) {
        intervalMap.set(
          itemToFade.id,
          setTimeout(t.removeToast, 3000, itemToFade, intervalMap, t),
        );
      } else {
        t.deleteElement(itemToFade, t);
      }
      return;
    }

    op = fadeIn ? op + 0.1 : op - 0.01;
    ref.style.opacity = op.toString();
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

    //appending toast to container
    this.toastContainer.appendChild(toast);

    //setting to model
    item.elementRef = toast;

    //storing
    this.toastMap.set(item.id, item);

    return item;
  }

  private getExisting(item: Item): Item {
    //stopping timeout
    if (this.elementIntervals.has(item.id)) {
      let intervalId = this.elementIntervals.get(item.id);
      clearTimeout(intervalId);
      clearInterval(intervalId);
      this.elementIntervals.delete(item.id);
    }

    let exsistingItem = this.toastMap.get(item.id);
    //update amount
    exsistingItem.amount += item.amount;
    //update text
    let textNode = exsistingItem.elementRef.querySelector('p');
    textNode.textContent =
      exsistingItem.amount + ' x ' + exsistingItem.displayName + ' Added';

    return exsistingItem;
  }

  private upsertItem(
    itemToAdd: Item,
    intervalMap: Map<string, number>,
    t: ToastService,
  ) {
    itemToAdd = this.toastMap.has(itemToAdd.id)
      ? this.getExisting(itemToAdd)
      : this.createToastElement(itemToAdd);

    this.elementIntervals.set(
      itemToAdd.id,
      setInterval(this.fade, 10, itemToAdd, intervalMap, t, true),
    );
  }

  private deleteElement(item: Item, t: ToastService) {
    let ref = item.elementRef;
    ref.parentElement.removeChild(ref);

    t.toastMap.delete(item.id);
  }
}
