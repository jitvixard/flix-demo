import { HotBar } from '../ui/hot-bar';
import { bindHotBarButtons } from '../util/bindings';

export class DebugController {
  constructor(private readonly hotBar: HotBar) {
    bindHotBarButtons(hotBar);
  }

  private playSubtleFadeAnimation() {
    console.log('playing subtle fade');
    this.hotBar.subtleFade();
  }
}
