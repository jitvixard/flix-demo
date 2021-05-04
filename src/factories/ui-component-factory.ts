import { HotBar } from '../ui/hot-bar';
import { App } from '../app';

export class UiComponentFactory {
  static hotBar: HotBar;

  static CreateComponents(app: App): void {
    console.log('creating components');
    this.hotBar = new HotBar(document.getElementById('hotbar'));
  }
}
