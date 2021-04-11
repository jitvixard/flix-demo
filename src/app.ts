import { Banana } from './model/items/impl/banana';
import { Carrot } from './model/items/impl/carrot';
import { Pear } from './model/items/impl/pear';
import { Hotbar } from './hotbar/hotbar';
import { ToastService } from './pop-up/toast';
import { Bread } from './model/items/impl/bread';
import { Apple } from './model/items/impl/apple';
import { Orange } from './model/items/impl/orange';

export class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  hotbarService = new Hotbar();
  toastService = new ToastService();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style

    this.bindButtons();
    this.bindResizeListener();
  }

  onResize = () => {
    if (window.innerWidth < 1200) {
      this.styleElementRef.setAttribute('href', this.smallerStyleSheet);
    } else {
      this.styleElementRef.setAttribute('href', this.defaultStyleSheet);
    }
  };

  bindResizeListener = () => {
    window.addEventListener('resize', (e: Event) => {
      this.onResize();
      this.hotbarService.resize();
    });
    this.onResize();
    this.hotbarService.resize();
  };
}

new App();
