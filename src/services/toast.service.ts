export class ToastService {
  toastContainer: HTMLElement;

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
    console.log(this.toastContainer);
  }
}
