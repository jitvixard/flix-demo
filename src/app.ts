import { Banana } from './model/banana';
import { Carrot } from './model/carrot';
import { Pear } from './model/pear';
import { Hotbar } from './hotbar/hotbar';
import { ToastService } from './services/toast.service';

class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  hotbarService = new Hotbar();
  toastService = new ToastService();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style

    window.addEventListener('resize', (e: Event) => this.onResize());

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
      this.hotbarService.cascadeOn(),
    );

    let cascadeOffBtn = document.getElementById('cascadeOffButton');
    cascadeOffBtn.addEventListener('click', (e: Event) =>
      this.hotbarService.cascadeOff(),
    );

    this.onResize();
  }

  onResize() {
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
  }
}

new App();
