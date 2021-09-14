import * as PIXI from 'pixi.js';
import app from '../appConfig.js'
const TextureCache = PIXI.utils.TextureCache;

import ButtonPlay from '../components/ButtonPlay.js';
import { gameProperty } from "../gameProperty.js"

export default class WinScene {
    constructor() {
        this.sceneRootContainer = null;
        this.sceneElementsContainer = null;
        this.buttonPlayContainer = null;  
        this.AnimFlag = true;
        this.animScale = 1000;
        this._preloadScene();
        this._preloadScene_Elements();
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
        this.buttonPlayContainer = buttonPlay.getButtonPlayContainer();
        this.buttonPlayContainer.x=(app.screen.width / 2)-(this.buttonPlayContainer.width / 2);
        this.buttonPlayContainer.y=app.screen.height - 150;
        this.buttonPlayContainer.on('pointerdown', this.handlerClickPlay.bind(this));

        this.sceneRootContainer.addChild(this.buttonPlayContainer);
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

    _preloadScene_Elements() {
        this.sceneElementsContainer = new PIXI.Container();
        const style=this._textStyle();

        const styleYellow=this._textStyleYellow();

        const girlTexture =TextureCache["char.png"];
        const girlSprite = new PIXI.Sprite(girlTexture);
        girlSprite.anchor.set(0.5);
        girlSprite.position.set(girlSprite.width / 2 - girlSprite.width / 8, app.screen.height - girlSprite.height / 2 );
        this.sceneElementsContainer.addChild(girlSprite);

        const textLine = new PIXI.Text('Can you solve every mystery?', style);
        textLine.x = (app.screen.width / 2) - (textLine.width/2);
        textLine.y = (app.screen.height / 2) + 10;
        this.sceneElementsContainer.addChild(textLine);

        const textLineHeader = new PIXI.Text('Great Job', styleYellow);
        textLineHeader.x = (app.screen.width / 2) - (textLineHeader.width / 2);
        textLineHeader.y = (app.screen.height / 2) - (textLineHeader.height / 2) -50;
        this.sceneElementsContainer.addChild(textLineHeader);

        const logoTexture =TextureCache["logo.png"];
        const logoSprite = new PIXI.Sprite(logoTexture);
        logoSprite.anchor.set(0.5);
        logoSprite.position.set(app.screen.width / 2, app.screen.height / 2 - logoSprite.height / 2 - 75 );
        this.sceneElementsContainer.addChild(logoSprite);

        this.sceneRootContainer.addChild(this.sceneElementsContainer);
    }

    
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

    animateButtonPlay(){    
            if(!this.AnimFlag){
                if(this.animScale == 1000){
                    this.AnimFlag = true;
                }
                this.animScale -= 1;
            }
    
            if(this.AnimFlag){
                if(this.animScale == 1100){
                    this.AnimFlag = false;
                }
                this.animScale += 1;
            }
           
            this.buttonPlayContainer.scale.set(this.animScale / 1000);
    }
}