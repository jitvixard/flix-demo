import { App } from '../app';
import { HotBar } from '../ui/hot-bar';
import { Toast } from '../ui/toast';
import { Banana } from '../model/items/impl/banana';
import { Carrot } from '../model/items/impl/carrot';
import { Pear } from '../model/items/impl/pear';
import { Orange } from '../model/items/impl/orange';
import { Bread } from '../model/items/impl/bread';
import { Apple } from '../model/items/impl/apple';
import { getItemFromName } from './factory';

export function bindHotBarAnimationDebugButtons(hotBar: HotBar) {
  document
    .getElementById('subtleFadeToggle')
    .addEventListener('click', () => hotBar.subtleFade());
  document
    .getElementById('subtleFadeOnButton')
    .addEventListener('click', () => hotBar.subtleFade(true));

  document
    .getElementById('subtleFadeOffButton')
    .addEventListener('click', () => hotBar.subtleFade(false));

  document
    .getElementById('cascadeToggle')
    .addEventListener('click', () => hotBar.cascade());
  document
    .getElementById('cascadeOnButton')
    .addEventListener('click', () => hotBar.cascade(true));

  document
    .getElementById('cascadeOffButton')
    .addEventListener('click', () => hotBar.cascade(false));
}

export function bindHotBarItemAnimations(hotBar: HotBar) {
  document
    .getElementById('addAppleButton')
    .addEventListener('click', () => hotBar.addToHotBar(new Apple(1), 1));

  document
    .getElementById('addBreadButton')
    .addEventListener('click', () => hotBar.addToHotBar(new Bread(1), 0));

  document
    .getElementById('addOrangeButton')
    .addEventListener('click', () => hotBar.addToHotBar(new Orange(1), 5));
}

export function bindToastDebugButtons(toast: Toast) {
  document
    .getElementById('addDemoBananaButton')
    .addEventListener('click', () => toast.addToast(new Banana(1)));

  document
    .getElementById('addDemoCarrotButton')
    .addEventListener('click', () => toast.addToast(new Carrot(3)));

  document
    .getElementById('addDemoPearButton')
    .addEventListener('click', () => toast.addToast(new Pear(1)));
}

export function bindSelectionButtons(hotBar: HotBar) {
  let selectionParent = document.getElementById('selection-buttons');
  Array.from(selectionParent.getElementsByTagName('input')).forEach(
    (element) => {
      let buttonValue = Number(element.getAttribute('value'));
      if (buttonValue !== undefined)
        element.addEventListener('click', () => hotBar.select(buttonValue - 1));
    },
  );
}

export function bindStyleChangeButton(app: App) {
  let styleBtn = document.getElementById('restyle');
  styleBtn.addEventListener('click', () => app.alternateStyle(styleBtn));
}

export function bindItemAdditionButtons(hotBar: HotBar, toast: Toast) {
  let itemParent = document.getElementById('item-buttons');
  Array.from(itemParent.getElementsByTagName('input')).forEach((element) => {
    let buttonValue = element.getAttribute('value');
    if (buttonValue !== undefined)
      element.addEventListener('click', () => {
        const itemToAdd = getItemFromName(buttonValue);
        hotBar.addToHotBar(itemToAdd);
        toast.addToast(itemToAdd);
      });
  });
}

/**
 * @param app Main application.
 *
 * Will bind resize listeners
 */
export function bindResizeListener(app: App) {
  window.addEventListener('resize', () => {
    app.onResize();
  });
  app.onResize();
}
