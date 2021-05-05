import { AbstractItem as Item } from '../model/items/abstract-item';
import { createToast } from '../util/factory';
import { ToastAnimation } from '../animations/toast-animation';
import { filter } from 'rxjs/operators';
import { removeElement } from '../util/utility';
import { Subscription } from 'rxjs';

export class Toast {
  private activeToast = new Array<Item>();
  private itemQueue = new Array<Item>();

  private itemSet = new Set<Item>();
  private toastAnimations = new Map<Item, ToastAnimation>();
  private toastSubscriptions = new Map<Item, Subscription>();

  readonly maxToast = 2;

  constructor(private toastContainer: HTMLElement) {}

  addToast(item: Item) {
    let shouldUpsert: boolean;
    this.itemSet.forEach((i) => {
      if (item.id === i.id) shouldUpsert = true;
    });

    if (!shouldUpsert) {
      //creating toast
      item = createToast(item);
      this.itemSet.add(item);
      this.itemQueue.push(item);
    } else {
      //updating existing
      this.updateExistingToast(item);
    }

    this.pop();
  }

  removeToast(item: Item) {
    const updatedActiveToast = new Array<Item>();
    this.activeToast
      .filter((i) => i.id !== item.id)
      .forEach((i) => updatedActiveToast.push(i));
    this.activeToast = updatedActiveToast;

    let toast = item.popupRef;
    item.popupRef = undefined;
    removeElement(toast);

    this.itemSet.delete(item);

    this.pop();
  }

  private updateExistingToast(item: Item) {
    let existingToast: Item;
    this.itemSet.forEach((i) => {
      if (i.id === item.id) {
        existingToast = i;
      }
    });

    if (existingToast) {
      existingToast.amount += item.amount;
      existingToast.popupRef.querySelector('p').textContent =
        existingToast.amount + ' x ' + existingToast.displayName + ' Added';
    }

    const isActive = this.activeToast.filter((i) => i.id === existingToast.id)
      .length;

    if (isActive) {
      //end animation
      let currentAnimation = this.toastAnimations.get(existingToast);
      this.toastSubscriptions.get(existingToast).unsubscribe();

      currentAnimation.stop();
      this.toastAnimations.delete(existingToast);
      //start animation
      currentAnimation = new ToastAnimation(existingToast.popupRef);
      this.toastSubscriptions.set(
        existingToast,
        currentAnimation
          .start()
          .pipe(filter((v) => v))
          .subscribe((complete) => {
            if (complete) {
              this.removeToast(existingToast);
            }
          }),
      );
      //saving animation
      this.toastAnimations.set(existingToast, currentAnimation);
    }
  }

  private pop() {
    if (!(this.activeToast.length < this.maxToast) || !this.itemQueue.length) {
      return;
    }

    const poppedToast = this.itemQueue.pop();
    this.activeToast.push(poppedToast);

    const toastAnim = new ToastAnimation(poppedToast.popupRef);
    this.toastAnimations.set(poppedToast, toastAnim);

    this.toastContainer.appendChild(poppedToast.popupRef);

    this.toastSubscriptions.set(
      poppedToast,
      toastAnim
        .start()
        .pipe(filter((v) => v))
        .subscribe((complete) => {
          if (complete) {
            this.removeToast(poppedToast);
          }
        }),
    );
  }
}
