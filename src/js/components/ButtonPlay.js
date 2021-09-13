import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;


export default class ButtonPlay {
    constructor() {
        this.buttonContainer=new PIXI.Container();
        this.buttonPlayTexture =TextureCache["btn.png"];
        this.buttonPlay = new PIXI.Sprite(this.buttonPlayTexture);
        this.buttonContainer.interactive = true;
        this.buttonContainer.buttonMode = true;
        this.buttonContainer.addChild(this.buttonPlay);

        this.ButtonText = new PIXI.Text("Play Now!", {
            fontFamily: "Arial",
            fontSize: 32,
            fill: "#FCF0AA",
            stroke: 'black',
            strokeThickness: 4,

        });
        this.ButtonText.anchor.set(0.5);
        this.ButtonText.position.set(this.buttonContainer.width / 2, this.buttonContainer.height / 2);
        this.buttonContainer.addChild(this.ButtonText)
    }
    getButtonPlayContainer() {
        return this.buttonContainer;
    }
}