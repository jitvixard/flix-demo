export class HotbarTransitionService {
  private hotbar: HTMLElement;

  private onPosition: boolean;

  private currentIndex: number;
  private currentRoutine: number;

  private target: number;
  private offPosition: number;

  private current: number;
  private currentOfRow: number;

  constructor(
    private elementsInOrder: HTMLElement[][],
    private animationLength: number,
    private fullWidthDistance: number,
    private reducedWidthDistance: number,
    private axis: string,
  ) {
    this.onPosition = true;
    this.target = 0;
    this.offPosition = this.axis === 'Y' ? 0 : -50;

    this.hotbar = document.getElementById('hotbar');
  }

  on() {
    this.prepForeOn();
    this.currentRoutine = setInterval(
      this.animate.bind(this, this.currentIndex, Date.now()),
      5,
    );
  }

  off() {
    this.prepForOff();
    this.currentRoutine = setInterval(
      this.animate.bind(this, this.currentIndex, Date.now()),
      5,
    );
  }

  updateWidth(fullWidth: boolean, newOrder: HTMLElement[][]) {
    if (newOrder !== undefined) this.elementsInOrder = newOrder;

    this.offPosition = fullWidth
      ? this.fullWidthDistance
      : this.reducedWidthDistance;

    this.current = this.onPosition ? 0 : this.offPosition;

    if (fullWidth && this.current <= this.fullWidthDistance) {
      const diff = this.reducedWidthDistance - this.fullWidthDistance;
      this.currentOfRow = this.current + diff;
      this.elementsInOrder.forEach((eArr) => {
        eArr.forEach((element) => this.setTranslate(element, this.current));
      });
    }
  }

  private animate(index: number, startTime: number) {
    const opacity = this.getOpacity(startTime, this.animationLength);


    if (this.current === this.target) {
      //end if at target
      clearInterval(this.currentRoutine);
      this.currentRoutine = setTimeout(
        this.moveOnToNextColumn.bind(this, index),
        this.animationLength,
      );

      if (this.axis === 'Y') {
        this.setForElements(this.target, opacity, this.elementsInOrder[index]);
      }
      else if (this.axis === 'X') {
        this.setForElements(this.target, opacity, [this.hotbar]);
      }

      return;
    }

    let translateToSet = this.lerpBetweenCurrentAndTarget(
      startTime,
      this.animationLength,
    );
    translateToSet = this.onPosition
      ? this.offPosition - translateToSet
      : translateToSet;

    if (this.axis === 'Y') {
      this.setForElements(translateToSet, opacity, this.elementsInOrder[index]);
    }
    else if (this.axis === 'X') {
      this.setForElements(translateToSet, opacity, [this.hotbar]);
    }

    this.current = translateToSet;
  }

  private prepForeOn() {
    this.onPosition = true;
    this.currentIndex = 0;
    this.target = 0;
    this.currentOfRow = this.offPosition;
  }

  private prepForOff() {
    this.onPosition = false;
    this.currentIndex = this.elementsInOrder.length - 1;
    this.target = this.offPosition;
    this.currentOfRow = 0;
  }

  private moveOnToNextColumn(completedIndex: number) {
    clearTimeout(this.currentRoutine);

    completedIndex = this.onPosition ? ++completedIndex : --completedIndex;

    if (
      completedIndex === -1 ||
      completedIndex === this.elementsInOrder.length
    ) {
      return;
    }

    this.current = this.currentOfRow;
    this.currentRoutine = setInterval(
      this.animate.bind(this, completedIndex, Date.now()),
      5,
    );
  }

  private lerpBetweenCurrentAndTarget(
    startTime: number,
    interval: number,
  ): number {
    const transformDistance = Math.abs(this.currentOfRow) + Math.abs(this.target);
    const fraction = transformDistance / interval;
    let deltaTime = Date.now() - startTime;
    deltaTime = deltaTime > interval ? interval : deltaTime;
    return Math.round(deltaTime * fraction);
  }

  private getOpacity(startTime: number, interval: number) {
    let opac = (Date.now() - startTime) / interval;
    opac = opac > 1 ? 1 : opac;
    return this.onPosition ? opac : 1 - opac;
  }

  private setForElements(translate: number, opacity: number, elements: HTMLElement[]) {
    elements.forEach(element => {
      this.setTranslate(element, translate);
      element.style.opacity = opacity.toString();
    });
  }

  private setTranslate = (element: HTMLElement, value: number) =>
    (element.style.transform = 'translate' + this.axis + '(' + value + '%)');
}
