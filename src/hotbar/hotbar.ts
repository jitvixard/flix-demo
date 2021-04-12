import { AbstractItem as Item } from '../model/items/abstract-item';
import { HotbarItemService } from './hotbar-item.service';
import { HotbarSelectionService } from './hotbar-selection.service';
import { HotbarTransitionService } from './hotbar-transition.service';

export class Hotbar {
  hotbarRef: HTMLElement;

  cascadeService: HotbarTransitionService;
  fadeService: HotbarTransitionService;
  itemService: HotbarItemService;
  selectService: HotbarSelectionService;

  targetTranslate = 0;
  translateDistance = 0;

  translateFullDistance = 130;
  translateReducedDistance = 230;

  runningInterval: number;
  cascadingOn: boolean;

  fullWidth: boolean;

  constructor() {
    this.hotbarRef = document.getElementById('hotbar');
    const cascadeOrder = this.getHotbarElements(window.innerWidth > 1200);

    this.itemService = new HotbarItemService();
    this.selectService = new HotbarSelectionService(
      this.getHotbarElements()[0],
      500,
    );

    this.cascadeService = new HotbarTransitionService(
      cascadeOrder,
      100,
      130,
      230,
      'Y',
    );

    this.fadeService = new HotbarTransitionService(
      this.getHotbarElements(),
      1000,
      125,
      125,
      'X',
    );
  }

  cascade(on: boolean) {
    if (on) this.cascadeService.on();
    else this.cascadeService.off();
  }

  fade(on: boolean) {
    if (on) this.fadeService.on();
    else this.fadeService.off();
  }

  add(item: Item, atIndex?: number) {
    this.itemService.add(item, atIndex);
  }

  resize() {
    console.log('resizing');
    let fullWidthOnResize = window.innerWidth >= 1200;
    if (this.fullWidth != fullWidthOnResize) {
      //has changed?
      let cascadeOrder = this.getHotbarElements(fullWidthOnResize);

      this.cascadeService.updateWidth(fullWidthOnResize, cascadeOrder);
      this.fadeService.updateWidth(fullWidthOnResize, undefined);
    }
  }

  select(index?: number, element?: HTMLElement) {
    if (element !== undefined) this.selectService.selectElement(element);
    else if (index !== undefined) this.selectService.selectAtIndex(index);
  }

  private getHotbarElements = (fullwidth?: boolean): HTMLElement[][] => {
    let elementsInHotbar = <HTMLElement[]>(
      (<any>document.getElementsByClassName('hotbar-item'))
    );

    if (fullwidth === undefined) {
      //getting all elements in order
      return [
        [
          elementsInHotbar[0],
          elementsInHotbar[1],
          elementsInHotbar[2],
          elementsInHotbar[3],
          elementsInHotbar[4],
          elementsInHotbar[5],
          elementsInHotbar[6],
          elementsInHotbar[7],
          elementsInHotbar[8],
          elementsInHotbar[9],
        ],
      ];
    }

    if (fullwidth) {
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
    } else {
      return [
        [elementsInHotbar[0], elementsInHotbar[5]],
        [elementsInHotbar[1], elementsInHotbar[6]],
        [elementsInHotbar[2], elementsInHotbar[7]],
        [elementsInHotbar[3], elementsInHotbar[8]],
        [elementsInHotbar[4], elementsInHotbar[9]],
      ];
    }
  };
}
