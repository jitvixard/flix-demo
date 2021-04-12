export class HotbarTransitionService {
  private hotbar: HTMLElement;

  private onPosition: boolean;

  private currentIndex: number;
  private currentRoutine: number;

  private offPosition: number;
  private startingPosition: number;
  private targetPosition: number;

  constructor(
    private elementsInOrder: HTMLElement[][],
    private readonly animationLength: number,
    private readonly fullWidthDistance: number,
    private readonly reducedWidthDistance: number,
    private readonly axis: string,
  ) {
    this.onPosition = true;
    this.targetPosition = 0;
    this.offPosition = 0;
    this.startingPosition = 0;

    this.hotbar = document.getElementById('hotbar');
  }

  on() {
    this.prepare(true);
    this.currentRoutine = setTimeout(
      this.animate.bind(this, this.currentIndex, Date.now()),
      5,
    );
  }

  off() {
    this.prepare(false);
    this.currentRoutine = setTimeout(
      this.animate.bind(this, this.currentIndex, Date.now()),
      5,
    );
  }

  updateWidth(fullWidth: boolean, newOrder: HTMLElement[][]) {
    if (newOrder !== undefined) this.elementsInOrder = newOrder;

    this.offPosition = fullWidth
      ? this.fullWidthDistance
      : this.reducedWidthDistance;

    this.startingPosition = this.onPosition ? 0 : this.offPosition;

    if (fullWidth && this.startingPosition <= this.fullWidthDistance) {
      this.elementsInOrder.forEach((eArr) => {
        eArr.forEach((element) =>
          window.setElementTransform(element, this.axis, this.startingPosition),
        );
      });
    }
  }

  private animate(index: number, startTime: number) {
    clearTimeout(this.currentRoutine);

    const targetOpacity = this.onPosition ? 1 : 0;
    const startingOpactiy = Math.abs(targetOpacity - 1);

    const elementsToTransform =
      this.axis === 'Y' ? this.elementsInOrder[index] : [this.hotbar];

    let currentTransform: number;

    //setting the transform and opacity for each element
    elementsToTransform.forEach((element) => {
      currentTransform = window.setElementTransform(
        element,
        this.axis,
        this.targetPosition,
        this.startingPosition,
        startTime,
        this.animationLength,
      );

      window.setElementOpacity(
        element,
        targetOpacity,
        startingOpactiy,
        startTime,
        this.animationLength,
      );
    });

    if (currentTransform.toFixed(2) === this.targetPosition.toFixed(2)) {
      //end if at target
      console.log('stopping animation');

      this.currentRoutine = setTimeout(
        this.moveOnToNextColumn.bind(this, index),
        this.animationLength,
      );
      return;
    }

    console.log(this.elementsInOrder[index][0].style.opacity);

    this.currentRoutine = setTimeout(
      this.animate.bind(this, index, startTime),
      5,
    );
  }

  private prepare(on: boolean) {
    this.onPosition = on;
    this.currentIndex = on ? 0 : this.elementsInOrder.length - 1;
    this.targetPosition = on ? 0 : this.offPosition;
    this.startingPosition = on ? this.offPosition : 0;
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

    this.currentRoutine = setInterval(
      this.animate.bind(this, completedIndex, Date.now()),
      5,
    );
  }
}
