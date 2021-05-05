import { HotBar } from '../ui/hot-bar';
import { App } from '../app';
import { Toast } from '../ui/toast';

export class UiComponentFactory {
  static hotBar: HotBar;
  static toast: Toast;

  static CreateComponents(app: App): void {
    this.hotBar = new HotBar(document.getElementById('hotbar'));
    this.toast = new Toast(document.getElementById('toast-container'));
  }
}
