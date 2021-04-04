class App {


    styleElementRef : HTMLElement;
    defaultStyleSheet = "Style/fullwidth.css";
    smallerStyleSheet = "Style/reducedwidth.css"

    constructor() {
        this.styleElementRef = document.getElementById("hotbarStyle");

        window.addEventListener("resize", (e: Event) => this.onResize());               //resizing event

        let btn = document.getElementById("addItemButton");                             //adding event to button
        btn.addEventListener("click", (e: Event) => this.addItem());

        this.onResize();
    }

    addItem() {

    }

    onResize() {
        const styleId = "hotbarStyle";

        if (window.innerWidth < 1200) {
            document.getElementById(styleId).setAttribute("href", this.smallerStyleSheet);
        }
        else {
            document.getElementById(styleId).setAttribute("href", this.defaultStyleSheet);
        }
    }


    //TODO Add Methods for button handling
}

new App();