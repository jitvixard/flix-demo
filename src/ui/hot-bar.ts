import { CascadeAnimation } from '../animations/cascade-animation';
import { SubtleFadeAnimation } from '../animations/subtle-fade-animation';
import { first } from 'rxjs/operators';
import { valueAsTransformString } from '../util/transformation';
import { calculateHotBarColumns } from '../util/utility';
import { AbstractItem } from '../model/items/abstract-item';
import { HotBarStoreService } from '../services/store/hot-bar-store.service';
import { ItemSelectionAnimation } from '../animations/item-selection-animation';

export class HotBar {
  private hotBarColumns: HTMLElement[][];
  private readonly hotBarSlots: HTMLElement[];

  private hotBarStore: HotBarStoreService;

  private cascadeAnimation: CascadeAnimation;
  private subtleFadeAnimation: SubtleFadeAnimation;

  private selectionIndex: number;
  private selectionAnimation: ItemSelectionAnimation;

  private hotBarOnState = true;
  private elementsOnState = true;

  constructor(private hotBarRef: HTMLElement) {
    this.hotBarRef.style.translate = valueAsTransformString(0, 'X');
    this.hotBarRef.style.transform = valueAsTransformString(0, 'Y');

    this.hotBarSlots = <HTMLElement[]>(
      (<any>document.getElementsByClassName('hotbar-item'))
    );
    this.hotBarStore = new HotBarStoreService(this.hotBarSlots);

    this.hotBarRef.style.opacity = '1';
  }

  addToHotBar(item: AbstractItem, atIndex?: number) {
    this.hotBarStore.add(item, atIndex);
  }

  cascade(elementsStateOverride?: boolean) {
    if (this.cascadeAnimation) {
      this.cascadeAnimation.stop();
    }

    this.elementsOnState =
      elementsStateOverride !== undefined
        ? elementsStateOverride
        : !this.elementsOnState;

    this.cascadeAnimation = new CascadeAnimation(
      this.hotBarColumns,
      this.elementsOnState,
    );

    this.cascadeAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.cascadeAnimation = undefined;
      });
  }

  subtleFade(hotBarStateOverride?: boolean) {
    if (this.subtleFadeAnimation) {
      this.subtleFadeAnimation.stop();
      return;
    }

    this.hotBarOnState =
      hotBarStateOverride !== undefined
        ? hotBarStateOverride
        : !this.hotBarOnState;

    this.subtleFadeAnimation = new SubtleFadeAnimation(
      this.hotBarRef,
      this.hotBarOnState,
    );

    this.subtleFadeAnimation
      .start()
      .pipe(first((v) => v))
      .subscribe((complete) => {
        if (complete) this.subtleFadeAnimation = undefined;
      });
  }

  select(selectionIndex: number) {
    if (selectionIndex === this.selectionIndex && this.selectionAnimation) {
      this.selectionAnimation.stop();
      return;
    }

    if (selectionIndex !== undefined) {
      this.selectionIndex = selectionIndex;
      if (this.selectionAnimation) {
        this.selectionAnimation.stop();
        this.selectionAnimation.complete$
          .pipe(first((v) => v))
          .subscribe((complete) => {
            if (complete) {
              let icon: HTMLImageElement;
              const item = this.hotBarStore.getAtIndex(selectionIndex);
              if (item) icon = item.iconRef;
              this.selectionAnimation = new ItemSelectionAnimation(
                this.hotBarSlots[selectionIndex],
                icon,
              );
              this.selectionAnimation.start();
            }
          });
      } else {
        let iconRef: HTMLImageElement;
        const item = this.hotBarStore.getAtIndex(selectionIndex);
        if (item) iconRef = item.iconRef;
        this.selectionAnimation = new ItemSelectionAnimation(
          this.hotBarSlots[selectionIndex],
          iconRef,
        );
        this.selectionAnimation.start();
      }
    }
  }

  updateColumns() {
    this.hotBarColumns = calculateHotBarColumns();
  }
}
