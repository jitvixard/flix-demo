import { Banana } from './model/banana';
import { Carrot } from './model/carrot';
import { Pear } from './model/pear';
import { ToastService } from './services/toast.service';

class App {
  styleElementRef: HTMLElement;
  defaultStyleSheet = 'Style/fullwidth.css';
  smallerStyleSheet = 'Style/reducedwidth.css';

  toastService = new ToastService();

  constructor() {
    this.styleElementRef = document.getElementById('hotbarStyle'); //ref to hotbar style

    window.addEventListener('resize', (e: Event) => this.onResize()); //resizing event

    let bananaBtn = document.getElementById('addBananaButton'); //adding event to button
    bananaBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Banana(1)),
    );

    let carrotBtn = document.getElementById('addCarrotButton'); //adding event to button
    carrotBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Carrot(1)),
    );

    let pearBtn = document.getElementById('addPearButton'); //adding event to button
    pearBtn.addEventListener('click', (e: Event) =>
      this.toastService.add(new Pear(1)),
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
