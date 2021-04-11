import { Hotbar } from './hotbar/hotbar';
import { ToastService } from './pop-up/toast';
import { bindButtons, bindResizeListener } from './util/bindings';

export class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  hotbarService = new Hotbar();
  toastService = new ToastService();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style
    bindButtons(this);
    bindResizeListener(this);
  }

  onResize = () => {
    if (window.innerWidth < 1200) {
      this.styleElementRef.setAttribute('href', this.smallerStyleSheet);
    } else {
      this.styleElementRef.setAttribute('href', this.defaultStyleSheet);
    }
  };
}

new App();
