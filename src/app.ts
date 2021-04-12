import { AbstractItem as Item } from './model/items/abstract-item';
import { Hotbar } from './hotbar/hotbar';
import { Toast } from './pop-up/toast';
import { bindButtons, bindResizeListener } from './util/bindings';

export class App {
  hotbarStyleRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  private hotbar = new Hotbar();
  private toast = new Toast();

  fullWidth: boolean;

  constructor() {
    // *** references *** //
    this.hotbarStyleRef = document.getElementById('hotbarStyle');

    // *** bindings *** //
    bindButtons(this);
    bindResizeListener(this);
  }

  add(item: Item) {
    this.hotbar.add(item);
    this.toast.add(item);
  }

  select(index: number) {
    this.hotbar.select(index);
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
