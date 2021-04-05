import { AbstractItem as Item } from './../model/item';

export class ToastService {
  toastContainer: HTMLElement;
  toastMap = new Map<string, number>();

  toastRoutines = new Map<HTMLDivElement, number>();

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
    console.log(this.toastContainer);
  }

  addItem(item: Item) {
    if (this.toastMap.has(item.id)) {
      return;
    }

    //update amount
    let amount = item.amount;

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

    //set conent text
    let text = document.createElement('p');
    text.innerText = amount + ' x ' + item.displayName + ' Added';

    content.appendChild(image);
    content.appendChild(text);

    //set content
    toast.appendChild(content);

    //appending toast to container
    this.toastContainer.appendChild(toast);

    //starting fade-in animation
    this.toastRoutines.set(
      toast,
      setInterval(this.fade, 10, toast, this.toastRoutines, true, this),
    );

    //storing element ref in array
    this.toastMap.set(item.id, item.amount);
  }

  //TODO add parameter for toast
  removeToast(toast: HTMLDivElement) {
    //TODO validity check
    //delete element from list
    /*const index = this.toastList.indexOf(toast, 0);
    if (index > -1) {
      this.toastList.splice(index, 1);
    }

    //fade-out routine
    this.toastRoutines.set(
      toast,
      setInterval(this.fade, 10, toast, this.toastRoutines, false),
    );*/
  }

  fade(
    toast: HTMLDivElement,
    routines: Map<any, any>,
    fadeIn: boolean,
    t?: ToastService,
  ) {
    var op: number = parseFloat(toast.style.opacity);
    var targetOp = fadeIn ? 1 : 0;

    if (op === targetOp) {
      clearInterval(routines.get(toast));
      routines.delete(toast);

      if (fadeIn) {
        setTimeout(() => {
          t.removeToast(toast);
        }, 3000);
      } else {
        toast.parentElement.removeChild(toast);
      }
      return;
    }

    op = fadeIn ? op + 0.1 : op - 0.01;
    toast.style.opacity = op.toString();
  }
}
