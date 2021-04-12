export class HotbarSelectionService {
  private currentlySelected: HTMLElement;
  private readonly selectedClassName = 'selected';

  private readonly animationMap = new Map<HTMLElement, number>();

  constructor(
    private hotbarItems: HTMLElement[],
    private animationLength: number,
  ) {}

  selectAtIndex(index: number) {
    if (index >= this.hotbarItems.length || index < 0) return;
    this.selectElement(this.hotbarItems[index]);
  }

  selectElement(element: HTMLElement) {
    //if this is not a hotbar item stop
    if (element.className !== 'hotbar-item') return;
    //if this item is already selected stop
    if (element === this.currentlySelected) return;

    //deselect previous item
    if (
      this.currentlySelected !== undefined &&
      this.currentlySelected !== element
    ) {
      this.deselect();
    }

    let selectionElement = this.createSelectionElement();
    let hotbarElementChildren = [].slice.call(element.children);

    if (hotbarElementChildren.length > 0)
      element.insertBefore(selectionElement, hotbarElementChildren[0]);
    else element.appendChild(selectionElement);

    this.currentlySelected = selectionElement.parentElement;
    let iconElement = this.currentlySelected.getElementsByTagName('img')[0];

    this.addAnimation(
      this.currentlySelected,
      setTimeout(
        this.selectAnimation.bind(
          this,
          [selectionElement, iconElement],
          true,
          Date.now(),
        ),
        5,
      ),
    );
  }

  deselect() {
    if (this.animationMap.has(this.currentlySelected)) {
      this.interruptAnimation(this.currentlySelected);
      return;
    }

    this.animationMap.set(
      this.currentlySelected,
      setTimeout(
        this.selectAnimation.bind(
          this,
          this.getHighlightIconTuple(this.currentlySelected),
          false,
          Date.now(),
        ),
      ),
    );
  }

  private createSelectionElement = () => {
    let div = document.createElement('div');
    div.className = this.selectedClassName;

    window.setElementOpacity(div, 0);

    return div;
  };

  private selectAnimation(
    highlightIconTuple: [HTMLElement, HTMLImageElement],
    selecting: boolean,
    startTime: number,
    startingOpacityAndScaleTuple?: [number, number],
  ) {
    let startingOpacity: number;
    let startingScale: number;

    if (startingOpacityAndScaleTuple !== undefined) {
      startingOpacity = startingOpacityAndScaleTuple[0];
      startingScale = startingOpacityAndScaleTuple[1];
    }

    const targetOpacity = selecting ? 1 : 0;
    const targetScale = selecting ? 1.25 : 1;

    let interval = selecting ? this.animationLength : this.animationLength / 2;
    if (startingScale !== undefined && startingOpacity !== undefined) {
      const startValueToPass = targetScale === 1.25 ? 1 : 1.25;
      interval = interval = getElapsed(
        interval,
        startValueToPass,
        startingScale,
        targetScale,
      );
    }

    const highlightElement = highlightIconTuple[0];
    const iconElement = highlightIconTuple[1];

    if (startingOpacity === undefined) startingOpacity = selecting ? 0 : 1;
    if (startingScale === undefined) startingScale = selecting ? 1 : 1.25;

    selecting ? this.animationLength : this.animationLength / 2;

    let currentOpacity: number;
    if (highlightElement !== undefined) {
      currentOpacity = window.setElementOpacity(
        highlightElement,
        targetOpacity,
        startingOpacity,
        startTime,
        interval,
      );
    }

    let currentScale: number;
    if (iconElement !== undefined) {
      currentScale = window.scaleElement(
        iconElement,
        targetScale,
        startingScale,
        startTime,
        interval,
      );
    }

    if (highlightElement !== undefined)
      this.stopAnimation(highlightElement.parentElement);
    else if (iconElement !== undefined)
      this.stopAnimation(iconElement.parentElement.parentElement);

    if (
      (currentScale !== undefined && currentScale >= targetScale) ||
      (currentOpacity !== undefined && currentOpacity >= targetOpacity)
    ) {
      if (highlightElement !== undefined)
        window.setElementOpacity(highlightElement, targetOpacity);
      if (iconElement !== undefined)
        window.scaleElement(iconElement, targetScale);

      if (!selecting) {
        highlightElement.parentElement.removeChild(highlightElement);
      }
      return;
    }

    this.animationMap.set(
      highlightElement.parentElement,
      setTimeout(
        this.selectAnimation.bind(
          this,
          highlightIconTuple,
          selecting,
          startTime,
          startingOpacityAndScaleTuple,
        ),
      ),
    );
  }

  private interruptAnimation(element: HTMLElement) {
    let highlightElement = <HTMLElement>(
      (<any>element.getElementsByClassName(this.selectedClassName)[0])
    );
    let iconElement = element.getElementsByTagName('img')[0];

    let currentOpacity: number;
    let currentScale: number;
    if (highlightElement !== undefined)
      currentOpacity = window.getElementOpacity(highlightElement);
    if (iconElement !== undefined)
      currentScale = window.getElementScale(iconElement);

    this.animationMap.set(
      element,
      setTimeout(
        this.selectAnimation.bind(
          this,
          [highlightElement, iconElement],
          false,
          Date.now(),
          [currentOpacity, currentScale],
        ),
      ),
    );
  }

  private addAnimation(element: HTMLElement, id: number) {
    this.stopAnimation(element);
    this.animationMap.set(element, id);
  }

  private stopAnimation(element: HTMLElement) {
    if (this.animationMap.has(element)) {
      clearTimeout(this.animationMap.get(element));
      this.animationMap.delete(element);
    }
  }

  private getHighlightIconTuple(
    element: HTMLElement,
  ): [HTMLElement, HTMLImageElement] {
    const highlightElement = <HTMLElement>(
      (<any>element.getElementsByClassName(this.selectedClassName)[0])
    );
    const iconElement = element.getElementsByTagName('img')[0];
    return [highlightElement, iconElement];
  }
}
