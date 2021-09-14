import * as PIXI from 'pixi.js';
import app from '../appConfig.js'
const TextureCache = PIXI.utils.TextureCache;

import ButtonPlay from '../components/ButtonPlay.js';
import { gameProperty } from "../gameProperty.js"

export default class WinScene {
    constructor() {
        this.sceneRootContainer = null;
        this.sceneContainerStep1 = null;
        this.sceneContainerStep2 = null;

        
        this._preloadScene();

        this._preloadScene_Step1();
        //this._preloadScene_Step2();
        //this.sceneContainerStep2.visible=false;
    }

    _preloadScene(){
        this.sceneRootContainer=new PIXI.Container();
        this.sceneRootContainer.width = app.screen.width;
        this.sceneRootContainer.height = app.screen.height;
        this.sceneRootContainer.x = app.screen.width / 2;
        this.sceneRootContainer.y = app.screen.height / 2;
        this.sceneRootContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);
        //add background
        const bg = new PIXI.Sprite.from(TextureCache["back_five_dogs.jpg"]);
        bg.position.set(app.screen.width / 2, app.screen.height / 2);
        bg.anchor.set(0.5);
        bg.scale.x = Math.min(app.screen.width / bg.width);
        bg.scale.y = Math.min(app.screen.height / bg.height);
        this.sceneRootContainer.addChild(bg);
        //add overlay
        const Overlay = new PIXI.Graphics();
        Overlay.beginFill(0x000000, 0.8);
        Overlay.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        Overlay.pivot.set(Overlay.width / 2, Overlay.height / 2);
        Overlay.endFill();
        this.sceneRootContainer.addChild(Overlay);
        //add ButtonPlay
        const buttonPlay = new ButtonPlay();
        const buttonPlayContainer = buttonPlay.getButtonPlayContainer();
        buttonPlayContainer.x=(app.screen.width / 2)-(buttonPlayContainer.width / 2);
        buttonPlayContainer.y=app.screen.height - 150;
        buttonPlayContainer.on('pointerdown', this.handlerClickPlay.bind(this));
        this.sceneRootContainer.addChild(buttonPlayContainer);
    }

    _textStyle(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 46,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: '#ffffff', 
            // stroke: '#ffffff',
            // strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
            wordWrap: true,
            wordWrapWidth: 400,
            lineJoin: 'round',
        });

        return style;
    }

    _textStyleYellow(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 96,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: '#F0C257',            
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1,
            wordWrap: true,
            wordWrapWidth: 450,
            lineJoin: 'round',
        });

        return style;
    }

    _preloadScene_Step1() {
        this.sceneContainerStep1 = new PIXI.Container();
        const style=this._textStyle();

        const styleYellow=this._textStyleYellow();

        const girlTexture =TextureCache["char.png"];
        const girlSprite = new PIXI.Sprite(girlTexture);
        girlSprite.anchor.set(0.5);
        girlSprite.position.set(girlSprite.width /2 -girlSprite.width /8, app.screen.height / 2);
        this.sceneContainerStep1.addChild(girlSprite);

        const textLine = new PIXI.Text('Can you solve every mystery?', style);
        textLine.x = (app.screen.width / 2)-(textLine.width/2);
        textLine.y = (app.screen.height / 2)+10;
        this.sceneContainerStep1.addChild(textLine);

        const textLineHeader = new PIXI.Text('Great Job', styleYellow);
        textLineHeader.x = (app.screen.width / 2)-(textLineHeader.width/2);
        textLineHeader.y = (app.screen.height / 2)-(textLineHeader.height/2) -50;
        this.sceneContainerStep1.addChild(textLineHeader);

        this.sceneRootContainer.addChild(this.sceneContainerStep1);
    }

    // _preloadScene_Step2() {
    //     this.sceneContainerStep2 = new PIXI.Container();
    //     const SpinnerLoading = new PIXI.Text("...Loading!", {
    //         fontFamily: "Arial",
    //         fontSize: 24,
    //         fill: "white",
    //         stroke: '#ff3300',
    //         strokeThickness: 4,
    //         dropShadow: true,
    //         dropShadowColor: "#000000",
    //         dropShadowBlur: 4,
    //         dropShadowAngle: Math.PI / 6,
    //         dropShadowDistance: 6,
    //     });
    //     SpinnerLoading.anchor.set(0.5);
    //     SpinnerLoading.position.set(app.screen.width / 2, app.screen.height / 2);

    //     this.sceneContainerStep2.addChild(SpinnerLoading);
    //     this.sceneRootContainer.addChild(this.sceneContainerStep2);
    // }

    getSceneContainer() {
        return this.sceneRootContainer;
    }

    visibleScene() {
        this.sceneRootContainer.visible = true;
    }

    hiddenScene() {
        this.sceneRootContainer.visible = false;
    }

    handlerClickPlay() {
        window.location = gameProperty.REDIRECT_URL;
    }
}