import { Banana } from './model/banana';
import { Carrot } from './model/carrot';
import { Pear } from './model/pear';
import { Hotbar } from './hotbar/hotbar';
import { ToastService } from './pop-up/toast.service';
import { Bread } from './model/bread';

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
    const styleId = 'hotbarStyle';

    if (window.innerWidth < 1200) {
      document
        .getElementById(styleId)
        .setAttribute('href', this.smallerStyleSheet);
    } else {
      document
        .getElementById(styleId)
        .setAttribute('href', this.defaultStyleSheet);
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

    let breadBtn = document.getElementById('addBreadButton');
    breadBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.add(new Bread(1), 0),
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
