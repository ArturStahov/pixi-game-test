import * as PIXI from 'pixi.js';
import app from '../appConfig.js'
const TextureCache = PIXI.utils.TextureCache;

import ButtonPlay from '../components/ButtonPlay.js';
import gameProperty from "../gameProperty.js"

export default class PreloadScene {
    constructor() {
        this.preloadSceneContainer = null;
        this.sceneContainerStep1 = null;
       
        this.dogSprite=null;
        this.textLine1=null;
        this.textLine2=null;
        this._preloadScene();

        this._preloadScene_Step1();
       
        
    }

    _preloadScene(){
        this.preloadSceneContainer=new PIXI.Container();
        this.preloadSceneContainer.width = app.screen.width;
        this.preloadSceneContainer.height = app.screen.height;
        this.preloadSceneContainer.x = app.screen.width / 2;
        this.preloadSceneContainer.y = app.screen.height / 2;
        this.preloadSceneContainer.pivot.set(app.screen.width / 2, app.screen.height / 2);
        //add background
        const bg = new PIXI.Sprite.from(TextureCache["back_five_dogs.jpg"]);
        bg.position.set(app.screen.width / 2, app.screen.height / 2);
        bg.anchor.set(0.5);
        bg.scale.x = Math.min(app.screen.width / bg.width);
        bg.scale.y = Math.min(app.screen.height / bg.height);
        this.preloadSceneContainer.addChild(bg);
        //add overlay
        const Overlay = new PIXI.Graphics();
        Overlay.beginFill(0x000000, 0.8);
        Overlay.drawRoundedRect(app.screen.width / 2, app.screen.height / 2, app.screen.width, app.screen.height, 16);
        Overlay.pivot.set(Overlay.width / 2, Overlay.height / 2);
        Overlay.endFill();
        this.preloadSceneContainer.addChild(Overlay);
        //add ButtonPlay
        const buttonPlay = new ButtonPlay();
        const buttonPlayContainer = buttonPlay.getButtonPlayContainer();
        buttonPlayContainer.x=(app.screen.width / 2)-(buttonPlayContainer.width / 2);
        buttonPlayContainer.y=app.screen.height - 150;
        buttonPlayContainer.on('pointerdown', this.handlerClickPlay.bind(this));
        this.preloadSceneContainer.addChild(buttonPlayContainer);
    }

    _textStyle(){
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 46,
            fontStyle: 'normal',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], 
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            lineJoin: 'round',
        });

        return style;
    }

    _preloadScene_Step1() {
        this.sceneContainerStep1 = new PIXI.Container();
        const style=this._textStyle();

        this.textLine2 = new PIXI.Text('Can you spot them?', style);
        this.textLine2.x = (app.screen.width / 2) - (this.textLine2.width / 2);
        this.textLine2.y = (app.screen.height / 2) - this.textLine2.height;
        this.sceneContainerStep1.addChild(this.textLine2);

        const dogTexture =TextureCache["doggy.png"];
        this.dogSprite = new PIXI.Sprite(dogTexture);
        this.dogSprite.anchor.set(0.5);
        this.dogSprite.scale.x *= -1;
        this.dogSprite.width = this.textLine2.height;
        this.dogSprite.height = this.textLine2.height * 2;
        this.dogSprite.position.set((app.screen.width / 2) + (this.textLine2.width/3), (app.screen.height / 2) - (this.dogSprite.height));
        this.sceneContainerStep1.addChild(this.dogSprite);

        this.textLine1 = new PIXI.Text('5 Hidden Dogs', style);
        this.textLine1.x = (app.screen.width / 2) - (this.textLine1.width / 2) - this.dogSprite.width /2;
        this.textLine1.y = (app.screen.height / 2) - this.textLine1.height *2;
        this.sceneContainerStep1.addChild(this.textLine1);

        this.preloadSceneContainer.addChild(this.sceneContainerStep1);
    }

    
    getPreloadSceneContainer() {
        return this.preloadSceneContainer;
    }

    visiblePreloadingScene() {
        this.preloadSceneContainer.visible = true;
    }

    hiddenPreloadingScene() {
        this.preloadSceneContainer.visible = false;
    }

    handlerClickPlay() {
        window.location = gameProperty.REDIRECT_URL;
    }

}