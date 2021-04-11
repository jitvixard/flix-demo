import { App } from '../app';
import { Apple } from '../model/items/impl/apple';
import { Banana } from '../model/items/impl/banana';
import { Bread } from '../model/items/impl/bread';
import { Carrot } from '../model/items/impl/carrot';
import { Orange } from '../model/items/impl/orange';
import { Pear } from '../model/items/impl/pear';

/**
 * @param app Main application buttons are being bound to.
 *
 * Utility function to bind all buttons.
 */
export function bindButtons(app: App): void {
  let bananaBtn = document.getElementById('addDemoBananaButton');
  bananaBtn.addEventListener('click', (e: Event) =>
    app.toastService.add(new Banana(1)),
  );

  let carrotBtn = document.getElementById('addDemoCarrotButton');
  carrotBtn.addEventListener('click', (e: Event) =>
    app.toastService.add(new Carrot(3)),
  );

  let pearBtn = document.getElementById('addDemoPearButton');
  pearBtn.addEventListener('click', (e: Event) =>
    app.toastService.add(new Pear(1)),
  );

  let cascadeOnBtn = document.getElementById('cascadeOnButton');
  cascadeOnBtn.addEventListener('click', (e: Event) =>
    app.hotbarService.cascade(true),
  );

  let cascadeOffBtn = document.getElementById('cascadeOffButton');
  cascadeOffBtn.addEventListener('click', (e: Event) =>
    app.hotbarService.cascade(false),
  );

  let fadeOnbtn = document.getElementById('subtleFadeOnButton');
  fadeOnbtn.addEventListener('click', (e: Event) =>
    app.hotbarService.fade(true),
  );

  let fadeOffbtn = document.getElementById('subtleFadeOffButton');
  fadeOffbtn.addEventListener('click', (e: Event) =>
    app.hotbarService.fade(false),
  );

  let appleBtn = document.getElementById('addAppleButton');
  appleBtn.addEventListener('click', (e: Event) =>
    app.hotbarService.add(new Apple(1), 1),
  );

  let breadBtn = document.getElementById('addBreadButton');
  breadBtn.addEventListener('click', (e: Event) =>
    app.hotbarService.add(new Bread(1), 0),
  );

  let orangeBtn = document.getElementById('addOrangeButton');
  orangeBtn.addEventListener('click', (e: Event) =>
    app.hotbarService.add(new Orange(1), 5),
  );

  let selectOne = document.getElementById('selectOne');
  selectOne.addEventListener('click', (e: Event) =>
    app.hotbarService.select(0),
  );

  let selectSeven = document.getElementById('selectSeven');
  selectSeven.addEventListener('click', (e: Event) =>
    app.hotbarService.select(6),
  );
}

export function bindResizeListener(app: App) {
  window.addEventListener('resize', (e: Event) => {
    app.onResize();
    app.hotbarService.resize();
  });
  app.onResize();
  app.hotbarService.resize();
}
