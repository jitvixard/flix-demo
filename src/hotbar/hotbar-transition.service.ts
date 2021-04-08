export class HotbarTransitionService {
  protected onPosition: boolean;

  protected currentIndex: number;
  protected currentRoutine: number;

  protected target: number;
  protected offPosition: number;

  protected current: number;
  protected currentOfRow: number;

  constructor(
    private elementsInOrder: HTMLElement[][],
    private animationLength: number,
    private fullWidthDistance: number,
    private reducedWidthDistance: number,
    private axis: string,
  ) {
    this.onPosition = true;
    this.target = 0;
    this.offPosition = 0;
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

  protected animate(index: number, startTime: number) {
    if (this.current === this.target) {
      //end if at target
      clearInterval(this.currentRoutine);
      this.currentRoutine = setTimeout(
        this.moveOnToNextColumn.bind(this, index),
        this.animationLength,
      );
      return;
    }

    let translateToSet = this.lerpBetweenCurrentAndTarget(
      startTime,
      this.animationLength,
    );
    translateToSet = this.onPosition
      ? this.offPosition - translateToSet
      : translateToSet;
    const opacity = this.getOpacity(startTime, this.animationLength);
    this.elementsInOrder[index].forEach((element) => {
      this.setTranslate(element, translateToSet);
      element.style.opacity = opacity.toString();
    });

    this.current = translateToSet;
  }

  protected prepForeOn() {
    this.onPosition = true;
    this.currentIndex = 0;
    this.target = 0;
    this.currentOfRow = this.offPosition;
  }

  protected prepForOff() {
    this.onPosition = false;
    this.currentIndex = this.elementsInOrder.length - 1;
    this.target = this.offPosition;
    this.currentOfRow = 0;
  }

  protected moveOnToNextColumn(completedIndex: number) {
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

  protected lerpBetweenCurrentAndTarget(
    startTime: number,
    interval: number,
  ): number {
    const transformDistance = Math.abs(this.currentOfRow - this.target);
    const fraction = transformDistance / interval;
    let deltaTime = Date.now() - startTime;
    deltaTime = deltaTime > interval ? interval : deltaTime;
    return Math.round(deltaTime * fraction);
  }

  protected getOpacity(startTime: number, interval: number) {
    let opac = (Date.now() - startTime) / interval;
    opac = opac > 1 ? 1 : opac;
    return this.onPosition ? opac : 1 - opac;
  }

  protected setTranslate = (element: HTMLElement, value: number) =>
    (element.style.transform = 'translate' + this.axis + '(' + value + '%)');
}
