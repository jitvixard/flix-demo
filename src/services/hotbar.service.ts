
export class HotbarService {

    hotbarRef: HTMLElement;
    hotbarCascadeOrder: HTMLElement[][];

    targetTranslate = 0;
    translateDistance = 0;

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

        this.cascadingOn = on;

        console.log('cascading from index::' + index);

        this.translateDistance = this.fullWidth 
            ? 130
            : 230;
        

        console.log('has a cascade distance of ' + this.translateDistance);

        this.targetTranslate = on 
            ? 0
            : this.translateDistance;

        console.log('moving to a translation of ' + this.targetTranslate);

        this.runningInterval = setInterval(this.cascadeInterval.bind(this, index, Date.now()), 10);

    }

    private cascadeInterval = (index: number, startTime: number) => {

        //console.log('firing interval')

        let translateFraction = this.translateDistance / 100;
        let deltaTime = Date.now() - startTime;
        deltaTime = deltaTime > 100 ? 100 : deltaTime;  
        let translateToSet = Math.round(translateFraction * deltaTime);

        if (this.cascadingOn) translateToSet = this.translateDistance - translateToSet;

        this.hotbarCascadeOrder[index].forEach((ref) => {
            ref.style.transform = 'translateY(' + translateToSet + '%)'
        })

        //console.log('[setting to :: ' + translateToSet + ']        [target is ::' + this.targetTranslate + ']')

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