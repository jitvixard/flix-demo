import { App } from '../app';
import { Apple } from '../model/items/impl/apple';
import { Banana } from '../model/items/impl/banana';
import { Bread } from '../model/items/impl/bread';
import { Carrot } from '../model/items/impl/carrot';
import { Orange } from '../model/items/impl/orange';
import { Pear } from '../model/items/impl/pear';
import { getItemFromName } from './factory';

/**
 * @param app Main application buttons are being bound to.
 *
 * Utility function to bind all buttons.
 */
export function bindButtons(app: App): void {
  /*
   * Popup Toast
   */
  let bananaBtn = document.getElementById('addDemoBananaButton');
  bananaBtn.addEventListener('click', (e: Event) => app.popup(new Banana(1)));

  let carrotBtn = document.getElementById('addDemoCarrotButton');
  carrotBtn.addEventListener('click', (e: Event) => app.popup(new Carrot(3)));

  let pearBtn = document.getElementById('addDemoPearButton');
  pearBtn.addEventListener('click', (e: Event) => app.popup(new Pear(1)));

  /*
   * Hotbar Transitions
   */
  let cascadeOnBtn = document.getElementById('cascadeOnButton');
  cascadeOnBtn.addEventListener('click', (e: Event) => app.cascade(true));

  let cascadeOffBtn = document.getElementById('cascadeOffButton');
  cascadeOffBtn.addEventListener('click', (e: Event) => app.cascade(false));

  let fadeOnbtn = document.getElementById('subtleFadeOnButton');
  fadeOnbtn.addEventListener('click', (e: Event) => app.subtleFade(true));

  let fadeOffbtn = document.getElementById('subtleFadeOffButton');
  fadeOffbtn.addEventListener('click', (e: Event) => app.subtleFade(false));

  /*
   * Item Additions
   */
  let appleBtn = document.getElementById('addAppleButton');
  appleBtn.addEventListener('click', (e: Event) => app.add(new Apple(1), 1));

  let breadBtn = document.getElementById('addBreadButton');
  breadBtn.addEventListener('click', (e: Event) => app.add(new Bread(1), 0));

  let orangeBtn = document.getElementById('addOrangeButton');
  orangeBtn.addEventListener('click', (e: Event) => app.add(new Orange(1), 5));

  let itemParent = document.getElementById('item-buttons');
  Array.from(itemParent.getElementsByTagName('input')).forEach((element) => {
    let buttonValue = element.getAttribute('value');
    if (buttonValue !== undefined)
      element.addEventListener('click', (e: Event) =>
        app.add(getItemFromName(buttonValue)),
      );
  });

  /*
   * Slot Selection
   */
  let selectionParent = document.getElementById('selection-buttons');
  Array.from(selectionParent.getElementsByTagName('input')).forEach(
    (element) => {
      let buttonValue = Number(element.getAttribute('value'));
      if (buttonValue !== undefined)
        element.addEventListener('click', (e: Event) =>
          app.select(buttonValue - 1),
        );
    },
  );
}

/**
 * @param app Main application.
 *
 * Will bind resize listeners
 */
export function bindResizeListener(app: App) {
  window.addEventListener('resize', (e: Event) => {
    app.onResize();
  });
  app.onResize();
}
