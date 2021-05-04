import { App } from '../app';
import { HotBar } from '../ui/hot-bar';

export function bindHotBarButtons(hotBar: HotBar) {
  document
    .getElementById('subtleFadeOnButton')
    .addEventListener('click', (e: Event) => hotBar.subtleFade());

  document
    .getElementById('subtleFadeOffButton')
    .addEventListener('click', (e: Event) => hotBar.subtleFade());
}

/**
 * @param app Main application buttons are being bound to.
 *
 * Utility function to bind all buttons.
 */
export function bindButtons(app: App): void {
  /*
   * Popup Toast
   */
  /*let bananaBtn = document.getElementById('addDemoBananaButton');
  bananaBtn.addEventListener('click', (e: Event) => app.popup(new Banana(1)));

  let carrotBtn = document.getElementById('addDemoCarrotButton');
  carrotBtn.addEventListener('click', (e: Event) => app.popup(new Carrot(3)));

  let pearBtn = document.getElementById('addDemoPearButton');
  pearBtn.addEventListener('click', (e: Event) => app.popup(new Pear(1)));*/

  /*
   * Hotbar Transitions
   */
  /*let cascadeOnBtn = document.getElementById('cascadeOnButton');
  cascadeOnBtn.addEventListener('click', (e: Event) => app.cascade(true));

  let cascadeOffBtn = document.getElementById('cascadeOffButton');
  cascadeOffBtn.addEventListener('click', (e: Event) => app.cascade(false));*/

  /*
   * Item Additions
   */
  /* let appleBtn = document.getElementById('addAppleButton');
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
  });*/

  /*
   * Slot Selection
   */
  let selectionParent = document.getElementById('selection-buttons');
  /*Array.from(selectionParent.getElementsByTagName('input')).forEach(
    (element) => {
      let buttonValue = Number(element.getAttribute('value'));
      if (buttonValue !== undefined)
        element.addEventListener('click', (e: Event) =>
          app.select(buttonValue - 1),
        );
    },
  );*/

  /*
   * Style Alternation
   */
  let styleBtn = document.getElementById('restyle');
  styleBtn.addEventListener('click', (e: Event) =>
    app.alternateStyle(styleBtn),
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
