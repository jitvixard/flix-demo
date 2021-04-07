
export class HotbarService {

    hotbarRef: HTMLElement;
    hotbarCascadeOrder: HTMLElement[][];

    targetTranslate = 0;

    translateFullDistance = 130;
    translateReducedDistance = 230;
    translateTimer = 0;

    runningInterval: number;
    cascadingOn: boolean;

    fullWidth: boolean;

    constructor() {
        this.hotbarRef = document.getElementById('hotbar');
    
        window.addEventListener('resize', (e: Event) => this.onResize());
        this.onResize();
    }

    cascadeOn() {
        this.cascade(true);
    }

    cascadeOff() {
        this.cascade(false);
    }

    private cascade(on: boolean) {

        let index = on 
            ? 0
            : this.hotbarCascadeOrder.length - 1;


        let length = this.fullWidth 
            ? 130
            : 230;
            
        this.targetTranslate = on 
            ? 0
            : length;

        this.runningInterval = setInterval(this.cascadeInterval.bind(this, index, Date.now()), 10);

    }

    private cascadeInterval = (index: number, startTime: number) => {

        console.log('firing interval')

        let translateFraction = this.targetTranslate / 100;
        let translateToSet = translateFraction * (Date.now() - startTime);

        if (translateToSet > this.targetTranslate) translateToSet = this.targetTranslate;

        this.hotbarCascadeOrder[index].forEach((ref) => {
            ref.style.transform = 'translateY(' + translateToSet + '%)'
        })

        if (translateToSet === this.targetTranslate) {
            clearInterval(this.runningInterval);
            setTimeout(this.cascadeNextColumn.bind(this, index));
            return;
        }
    }

    private cascadeNextColumn(index: number) { 
        index = this.cascadingOn 
            ? index + 1
            : index - 1;
            
        if (index < 0 || index >= this.hotbarCascadeOrder.length) return;

        this.runningInterval = setInterval(this.cascadeInterval.bind(this, index, Date.now()), 10);
    }

    private onResize() {
        console.log('resizing')
        let fullWidthOnResize = window.innerWidth >= 1200;
        if (this.fullWidth != fullWidthOnResize) {
            this.hotbarCascadeOrder = fullWidthOnResize 
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