import { AbstractItem as Item } from './model/items/abstract-item';
import { Hotbar } from './hotbar/hotbar';
import { Toast } from './pop-up/toast';
import { bindButtons, bindResizeListener } from './util/bindings';

export class App {
  hotbarStyleRef: HTMLElement;
  defaultStyleSheet = 'style/fullwidth.css';
  smallerStyleSheet = 'style/reducedwidth.css';

  private hotbar = new Hotbar();
  private toast = new Toast();

  alternateStyleActivated: boolean;
  fullWidth: boolean;

  constructor() {
    // *** references *** //
    this.hotbarStyleRef = document.getElementById('hotbarStyle');

    this.alternateStyleActivated = false;

    // *** bindings *** //
    bindButtons(this);
    bindResizeListener(this);
  }

  add = (item: Item, atIndex?: number) => {
    this.hotbar.add(item, atIndex);
    this.toast.add(item);
  };

  select = (index: number) => {
    this.hotbar.select(index);
  };

  popup = (item: Item) => this.toast.add(item);

  cascade = (on: boolean) => this.hotbar.cascade(on);

  subtleFade = (on: boolean) => this.hotbar.fade(on);

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

  alternateStyle = (button: HTMLElement) => {
    let styleRef = document.getElementById('alternateStyle');
    if (this.alternateStyleActivated) styleRef.setAttribute('href', '');
    else styleRef.setAttribute('href', 'style/alternate.css');

    this.alternateStyleActivated = !this.alternateStyleActivated;

    const textToSet = this.alternateStyleActivated
      ? 'Revert Style'
      : 'Adjust Style';

    button.setAttribute('value', textToSet);
  };
}

new App();
