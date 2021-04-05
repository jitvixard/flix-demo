class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  toastContainer: HTMLElement;

  count = 0;

  toastList = new Array();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle');

    this.toastContainer = document.getElementById('toast-container');

    window.addEventListener('resize', (e: Event) => this.onResize()); //resizing event

    let addBtn = document.getElementById('addItemButton'); //adding event to button
    addBtn.addEventListener('click', (e: Event) => this.addItem());
    let rmvBtn = document.getElementById('removeItemButton'); //adding event to button
    rmvBtn.addEventListener('click', (e: Event) => this.removeItem());

    this.onResize();
  }

  addItem() {
    let toast = document.createElement('div');
    toast.className = 'popup-toast';
    let text = document.createTextNode(this.count.toString());
    this.count++;
    toast.appendChild(text);

    this.toastContainer.appendChild(toast);

    this.toastList.push(toast);
  }

  removeItem() {
    let poppedToast = this.toastList.pop();

    this.toastContainer.removeChild(poppedToast);
  }

  onResize() {
    const styleId = 'hotbarStyle';

    if (window.innerWidth < 1200) {
      document
        .getElementById(styleId)
        .setAttribute('href', this.smallerStyleSheet);
    } else {
      document
        .getElementById(styleId)
        .setAttribute('href', this.defaultStyleSheet);
    }
  }

  //TODO Add Methods for button handling
}

new App();
