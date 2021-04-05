export class ToastService {
  toastContainer: HTMLElement;
  toastList = new Array();

  toastRoutines = new Map();

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
    console.log(this.toastContainer);
  }

  addItem() {
    //create toast element and set opacity
    let toast = document.createElement('div');
    toast.className = 'popup-toast';
    toast.style.opacity = (0).toString();

    //setting content of toast element
    let text = document.createTextNode(this.toastList.length.toString());
    toast.appendChild(text);

    //appending toast to container
    this.toastContainer.appendChild(toast);

    //starting fade-in animation
    this.toastRoutines.set(
      toast,
      setInterval(this.fade, 10, toast, this.toastRoutines, true),
    );

    //storing element ref in array
    this.toastList.push(toast);
  }

  //TODO add parameter for toast
  removeItem() {
    //TODO validity check
    let poppedToast = this.toastList[0];
    this.toastRoutines.set(
      poppedToast,
      setInterval(this.fade, 10, poppedToast, this.toastRoutines, false),
    );
  }

  fade(toast: HTMLDivElement, routines: Map<any, any>, fadeIn: boolean) {
    var op: number = parseFloat(toast.style.opacity);
    var targetOp = fadeIn ? 1 : 0;

    if (op === targetOp) {
      clearInterval(routines.get(toast));
      routines.delete(toast);

      if (!fadeIn) {
        toast.parentElement.removeChild(toast);
      }
      return;
    }

    op = fadeIn ? op + 0.1 : op - 0.01;
    toast.style.opacity = op.toString();
  }
}
