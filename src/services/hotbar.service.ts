export class HotbarService {

    hotbarRef: HTMLElement;
    hotbarElements: Element[][];

    fullWidth: boolean;

    constructor() {
        this.hotbarRef = document.getElementById('hotbar');
    
        window.addEventListener('resize', (e: Event) => this.onResize());
        this.onResize();
    }

    private onResize() {
        console.log('resizing')
        let fullWidthOnResize = window.innerWidth >= 1200;
        if (this.fullWidth != fullWidthOnResize) {
            this.hotbarElements = fullWidthOnResize 
                ? this.fullWidthOrder() 
                : this.reducedWidthOrder();
                //TODO reset cascade animation 
        }

        this.fullWidth = fullWidthOnResize;
    }

    private reducedWidthOrder():  HTMLElement[][] {
        let elementsInHotbar = <HTMLElement[]><any>document.getElementsByClassName('hotbar-item');
        return [
            [elementsInHotbar[0], elementsInHotbar[5]],
            [elementsInHotbar[1], elementsInHotbar[6]],
            [elementsInHotbar[2], elementsInHotbar[7]],
            [elementsInHotbar[3], elementsInHotbar[8]],
            [elementsInHotbar[4], elementsInHotbar[9]],
        ];
    }

    private fullWidthOrder(): HTMLElement[][] {
        let elementsInHotbar = <HTMLElement[]><any>document.getElementsByClassName('hotbar-item');
        return [
            [elementsInHotbar[0]],
            [elementsInHotbar[1]],
            [elementsInHotbar[2]],
            [elementsInHotbar[3]],
            [elementsInHotbar[4]],
            [elementsInHotbar[5]],
            [elementsInHotbar[6]],
            [elementsInHotbar[7]],
            [elementsInHotbar[8]],
            [elementsInHotbar[9]],
        ];
    }












}