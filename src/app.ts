import { isScreenFullWidth } from './util/utility';
import { UiComponentFactory } from './factories/ui-component-factory';
import { HotBar } from './ui/hot-bar';
import { DebugController } from './controllers/debug.controller';
import { bindResizeListener } from './util/bindings';
import { Toast } from './ui/toast';

export class App {
  //ui-components
  hotBar: HotBar;
  toast: Toast;

  //controllers
  debugController: DebugController;

  hotBarStyleRef: HTMLElement;

  defaultStyleSheet = 'style/fullwidth.css';
  smallerStyleSheet = 'style/reducedwidth.css';

  alternateStyleActivated: boolean;
  fullWidth: boolean;

  constructor() {
    // *** references *** //
    this.hotBarStyleRef = document.getElementById('hotbarStyle');
    this.alternateStyleActivated = false;

    //Getting references to UI components
    UiComponentFactory.CreateComponents(this);
    this.hotBar = UiComponentFactory.hotBar;
    this.toast = UiComponentFactory.toast;

    //Setting up controllers
    this.debugController = new DebugController(this, this.hotBar, this.toast);

    bindResizeListener(this);
  }

  onResize = () => {
    const isNowFullWidth = isScreenFullWidth();
    if (this.fullWidth !== undefined && this.fullWidth == isNowFullWidth) {
      return;
    }

    this.fullWidth = isNowFullWidth;
    if (this.fullWidth) {
      this.hotBarStyleRef.setAttribute('href', this.defaultStyleSheet);
    } else {
      this.hotBarStyleRef.setAttribute('href', this.smallerStyleSheet);
    }

    this.hotBar.updateColumns();
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
