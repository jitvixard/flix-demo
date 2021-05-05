import { HotBar } from '../ui/hot-bar';
import {
  bindHotBarAnimationDebugButtons,
  bindHotBarItemAnimations,
  bindItemAdditionButtons,
  bindSelectionButtons,
  bindStyleChangeButton,
  bindToastDebugButtons,
} from '../util/bindings';
import { Toast } from '../ui/toast';
import { App } from '../app';

export class DebugController {
  constructor(
    private readonly app: App,
    private readonly hotBar: HotBar,
    private readonly toast: Toast,
  ) {
    bindHotBarAnimationDebugButtons(hotBar);
    bindHotBarItemAnimations(hotBar);
    bindSelectionButtons(hotBar);
    bindToastDebugButtons(toast);
    bindStyleChangeButton(app);
    bindItemAdditionButtons(hotBar, toast);
  }
}
