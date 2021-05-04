import { HotBar } from '../ui/hot-bar';
import { App } from '../app';

export class UiComponentFactory {
  static hotBar: HotBar;

  static CreateComponents(app: App): void {
    this.hotBar = new HotBar(document.getElementById('hotbar'));
  }
}
