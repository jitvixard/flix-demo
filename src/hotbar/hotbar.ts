import { HotbarTransitionService } from './hotbar-transition.service';

export class Hotbar {
  hotbarRef: HTMLElement;

  cascadeService: HotbarTransitionService;
  fadeService: HotbarTransitionService;

  targetTranslate = 0;
  translateDistance = 0;

  translateFullDistance = 130;
  translateReducedDistance = 230;

  runningInterval: number;
  cascadingOn: boolean;

  fullWidth: boolean;

  constructor() {
    this.hotbarRef = document.getElementById('hotbar');
    const cascadeOrder =
      window.innerWidth > 1200
        ? this.fullWidthOrder()
        : this.reducedWidthOrder();

    this.cascadeService = new HotbarTransitionService(
      cascadeOrder,
      100,
      130,
      230,
      'Y',
    );

    const fadeOrder = <HTMLElement[]>(
      (<any>document.getElementsByClassName('hotbar-item'))
    );

    console.log(fadeOrder);

    this.fadeService = new HotbarTransitionService(
      [fadeOrder],
      1000,
      130,
      230,
      'X',
    );

    window.addEventListener('resize', (e: Event) => this.onResize());

    this.onResize();
  }

  cascade(on: boolean) {
    if (on) this.cascadeService.on();
    else this.cascadeService.off();
  }

  fade(on: boolean) {
    if (on) this.fadeService.on();
    else this.fadeService.off();
  }

  private onResize() {
    let fullWidthOnResize = window.innerWidth >= 1200;
    if (this.fullWidth != fullWidthOnResize) {
      //has changed?
      let cascadeOrder = fullWidthOnResize
        ? this.fullWidthOrder()
        : this.reducedWidthOrder();

      this.cascadeService.updateWidth(fullWidthOnResize, cascadeOrder);
      this.fadeService.updateWidth(fullWidthOnResize, undefined);
    }
  }

  private reducedWidthOrder(): HTMLElement[][] {
    let elementsInHotbar = <HTMLElement[]>(
      (<any>document.getElementsByClassName('hotbar-item'))
    );
    return [
      [elementsInHotbar[0], elementsInHotbar[5]],
      [elementsInHotbar[1], elementsInHotbar[6]],
      [elementsInHotbar[2], elementsInHotbar[7]],
      [elementsInHotbar[3], elementsInHotbar[8]],
      [elementsInHotbar[4], elementsInHotbar[9]],
    ];
  }

  private fullWidthOrder(): HTMLElement[][] {
    let elementsInHotbar = <HTMLElement[]>(
      (<any>document.getElementsByClassName('hotbar-item'))
    );
    return [
      [elementsInHotbar[0]],
      [elementsInHotbar[1]],
      [elementsInHotbar[2]],
      [elementsInHotbar[3]],
      [elementsInHotbar[4]],
      [elementsInHotbar[5]],
      [elementsInHotbar[6]],
      [elementsInHotbar[7]],
      [elementsInHotbar[8]],
      [elementsInHotbar[9]],
    ];
  }
}
