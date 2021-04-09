export class HotbarSelectionService {
  currentlySelected: HTMLElement;

  constructor(private hotbarItems: HTMLElement[]) {}

  selectAtIndex(index: number) {
    if (index >= this.hotbarItems.length || index < 0) return;
    this.selectElement(this.hotbarItems[index]);
  }

  selectElement(element: HTMLElement) {
    if (element.className !== 'hotbar-item') return;

    this.deselect();

    let node = this.createSelectionElement();

    let childrenToSet = [].slice.call(element.children);

    if (childrenToSet.length > 0) element.insertBefore(node, childrenToSet[0]);
    else element.appendChild(node);

    this.currentlySelected = node;

    //TODO playAnimation
  }

  deselect() {
    this.currentlySelected;
  }

  private createSelectionElement = () => {
    let div = document.createElement('div');
    div.className = 'selected';
    return div;
  };

  private selectAnimation(element: HTMLElement, selecting: boolean) {}
}
