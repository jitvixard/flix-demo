import { Banana } from './model/items/impl/banana';
import { Carrot } from './model/items/impl/carrot';
import { Pear } from './model/items/impl/pear';
import { Hotbar } from './hotbar/hotbar';
import { ToastService } from './pop-up/toast';
import { Bread } from './model/items/impl/bread';
import { Apple } from './model/items/impl/apple';
import { Orange } from './model/items/impl/orange';

class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  hotbarService = new Hotbar();
  toastService = new ToastService();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style

    this.bindButtons();
    this.bindResizeListener();
  }

  onResize = () => {
    if (window.innerWidth < 1200) {
      this.styleElementRef.setAttribute('href', this.smallerStyleSheet);
    } else {
      this.styleElementRef.setAttribute('href', this.defaultStyleSheet);
    }
  };

  bindButtons = () => {
    let bananaBtn = document.getElementById('addDemoBananaButton');
    bananaBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Banana(1)),
    );

    let carrotBtn = document.getElementById('addDemoCarrotButton');
    carrotBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Carrot(3)),
    );

    let pearBtn = document.getElementById('addDemoPearButton');
    pearBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Pear(1)),
    );

    let cascadeOnBtn = document.getElementById('cascadeOnButton');
    cascadeOnBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.cascade(true),
    );

    let cascadeOffBtn = document.getElementById('cascadeOffButton');
    cascadeOffBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.cascade(false),
    );

    let fadeOnbtn = document.getElementById('subtleFadeOnButton');
    fadeOnbtn.addEventListener('click', (e: Event) =>
      this.hotbarService.fade(true),
    );

    let fadeOffbtn = document.getElementById('subtleFadeOffButton');
    fadeOffbtn.addEventListener('click', (e: Event) =>
      this.hotbarService.fade(false),
    );

    let appleBtn = document.getElementById('addAppleButton');
    appleBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.add(new Apple(1), 1),
    );

    let breadBtn = document.getElementById('addBreadButton');
    breadBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.add(new Bread(1), 0),
    );

    let orangeBtn = document.getElementById('addOrangeButton');
    orangeBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.add(new Orange(1), 5),
    );

    let selectOne = document.getElementById('selectOne');
    selectOne.addEventListener('click', (e: Event) =>
      this.hotbarService.select(0),
    );

    let selectSeven = document.getElementById('selectSeven');
    selectSeven.addEventListener('click', (e: Event) =>
      this.hotbarService.select(6),
    );
  };

  bindResizeListener = () => {
    window.addEventListener('resize', (e: Event) => {
      this.onResize();
      this.hotbarService.resize();
    });
    this.onResize();
    this.hotbarService.resize();
  };
}

new App();
