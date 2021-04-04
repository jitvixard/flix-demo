export class Grenade implements Item {
    readonly id: string;
    readonly pathToAsset: string;

    amount: number;


    constructor () {
        this.id = "grenade";
        this.amount = 1;
        this.pathToAsset = "Assets/Items/Grenade.png"
    }

    
}