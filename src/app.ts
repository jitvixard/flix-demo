import { Hotbar } from './hotbar/hotbar';
import { Toast } from './pop-up/toast';
import { bindButtons, bindResizeListener } from './util/bindings';

export class App {
  hotbarStyleRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  hotbar = new Hotbar();
  toastService = new Toast();

  animationMap: Map<HTMLElement, number>;

  fullWidth: boolean;

  constructor() {
    // *** instantiation *** //
    this.animationMap = new Map<HTMLElement, number>();

    // *** references *** //
    this.hotbarStyleRef = document.getElementById('hotbarStyle');

    // *** bindings *** //
    bindButtons(this);
    bindResizeListener(this);
  }

  onResize = () => {
    const isNowFullWidth = window.innerWidth > 1200;

    if (this.fullWidth !== undefined && this.fullWidth == isNowFullWidth) {
      return;
    }

    this.fullWidth = isNowFullWidth;

    if (this.fullWidth) {
      this.hotbarStyleRef.setAttribute('href', this.defaultStyleSheet);
    } else {
      this.hotbarStyleRef.setAttribute('href', this.smallerStyleSheet);
    }

    this.hotbar.resize();
  };
}

new App();
